#!/usr/bin/env python3
"""Generate bundled focus audio WAV files for SmartStudy AI.

The generated files are deterministic and loop-friendly. They aim for a
balanced result: more realistic than placeholder synthesis, while remaining
stable enough for long background playback.
"""

from __future__ import annotations

import math
import wave
from pathlib import Path

import numpy as np


SAMPLE_RATE = 24_000
DURATION_SECONDS = 32.0
TOTAL_SAMPLES = int(SAMPLE_RATE * DURATION_SECONDS)
OUTPUT_DIR = Path(__file__).resolve().parents[1] / "audio"
SEED = 20260519


def time_axis() -> np.ndarray:
    return np.arange(TOTAL_SAMPLES, dtype=np.float64) / SAMPLE_RATE


def normalize(signal: np.ndarray, peak: float = 0.92) -> np.ndarray:
    max_amp = float(np.max(np.abs(signal)))
    if max_amp <= 1e-9:
        return signal.copy()
    return signal * (peak / max_amp)


def rms(signal: np.ndarray) -> float:
    return float(np.sqrt(np.mean(np.square(signal))))


def normalize_rms(signal: np.ndarray, target_rms: float = 0.17, peak_limit: float = 0.92) -> np.ndarray:
    current_rms = rms(signal)
    if current_rms > 1e-9:
        signal = signal * (target_rms / current_rms)
    return normalize(signal, peak=peak_limit)


def normalize_stereo(stereo_signal: np.ndarray, target_rms: float = 0.17, peak_limit: float = 0.92) -> np.ndarray:
    left = normalize_rms(stereo_signal[:, 0], target_rms=target_rms, peak_limit=peak_limit)
    right = normalize_rms(stereo_signal[:, 1], target_rms=target_rms, peak_limit=peak_limit)
    return stereo(left, right)


def stereo(left: np.ndarray, right: np.ndarray | None = None) -> np.ndarray:
    if right is None:
        right = left.copy()
    return np.stack([left, right], axis=1)


def write_wav(path: Path, stereo_signal: np.ndarray) -> None:
    stereo_signal = np.clip(stereo_signal, -1.0, 1.0)
    pcm = (stereo_signal * 32767).astype(np.int16)
    with wave.open(str(path), "wb") as wav_file:
        wav_file.setnchannels(2)
        wav_file.setsampwidth(2)
        wav_file.setframerate(SAMPLE_RATE)
        wav_file.writeframes(pcm.tobytes())


def lowpass(signal: np.ndarray, alpha: float) -> np.ndarray:
    output = np.empty_like(signal)
    accumulator = 0.0
    for index, sample in enumerate(signal):
        accumulator += alpha * (sample - accumulator)
        output[index] = accumulator
    return output


def highpass(signal: np.ndarray, alpha: float) -> np.ndarray:
    return signal - lowpass(signal, alpha)


def bandpass(signal: np.ndarray, low_alpha: float, high_alpha: float) -> np.ndarray:
    return highpass(lowpass(signal, high_alpha), low_alpha)


def add_echo(signal: np.ndarray, delay_seconds: float, decay: float, repeats: int = 2) -> np.ndarray:
    delayed = signal.copy()
    delay = int(delay_seconds * SAMPLE_RATE)
    for repeat in range(1, repeats + 1):
        offset = delay * repeat
        if offset >= len(signal):
            break
        delayed[offset:] += signal[:-offset] * (decay ** repeat)
    return delayed


def make_loop_friendly(signal: np.ndarray, fade_seconds: float = 2.0) -> np.ndarray:
    fade = min(int(fade_seconds * SAMPLE_RATE), len(signal) // 4)
    if fade <= 0:
        return signal

    out = signal.copy()
    start = out[:fade].copy()
    end = out[-fade:].copy()
    phase = np.linspace(0.0, 1.0, fade, endpoint=False)
    fade_out = 0.5 * (1.0 + np.cos(np.pi * phase))
    fade_in = 1.0 - fade_out
    blended = (start * fade_out) + (end * fade_in)
    out[:fade] = blended
    out[-fade:] = blended
    return out


def smooth_noise(rng: np.random.Generator, size: int, color: str = "pink") -> np.ndarray:
    white = rng.normal(0.0, 1.0, size)
    if color == "white":
        return white * 0.25
    if color == "brown":
        return lowpass(white, 0.012) * 1.8

    a = lowpass(white, 0.018)
    b = lowpass(white, 0.004)
    c = lowpass(white, 0.0012)
    return (0.62 * a + 0.28 * b + 0.1 * c) * 0.95


def random_click_train(
    rng: np.random.Generator,
    min_gap: float,
    max_gap: float,
    click_duration: tuple[float, float],
    freq_range: tuple[float, float],
    amplitude_range: tuple[float, float],
) -> np.ndarray:
    output = np.zeros(TOTAL_SAMPLES, dtype=np.float64)
    cursor = rng.uniform(0.0, max_gap)
    while cursor < DURATION_SECONDS:
        start = int(cursor * SAMPLE_RATE)
        length = int(rng.uniform(*click_duration) * SAMPLE_RATE)
        if start + length >= TOTAL_SAMPLES:
            break

        attack = max(3, int(length * 0.08))
        release = max(3, int(length * 0.4))
        sustain = max(0, length - attack - release)
        env = np.concatenate(
            [
                np.linspace(0.0, 1.0, attack, endpoint=False),
                np.ones(sustain),
                np.linspace(1.0, 0.0, release, endpoint=False),
            ]
        )
        if len(env) < length:
            env = np.pad(env, (0, length - len(env)))
        env = env[:length]
        freq = rng.uniform(*freq_range)
        tone = np.sin(2.0 * np.pi * freq * np.arange(length) / SAMPLE_RATE)
        output[start:start + length] += tone * env * rng.uniform(*amplitude_range)
        cursor += rng.uniform(min_gap, max_gap)
    return output


def rain_track(rng: np.random.Generator) -> np.ndarray:
    t = time_axis()
    bed = bandpass(smooth_noise(rng, TOTAL_SAMPLES, "pink"), 0.0018, 0.05)
    lfo = 0.78 + 0.22 * np.sin(2.0 * np.pi * 0.06 * t + 0.5)
    droplets = random_click_train(rng, 0.06, 0.25, (0.01, 0.04), (1300.0, 4200.0), (0.012, 0.042))
    left = lowpass((bed * lfo) + droplets, 0.09)
    right = lowpass((np.roll(bed, 421) * (0.8 + 0.18 * np.sin(2.0 * np.pi * 0.05 * t - 0.2))) + np.roll(droplets, 170), 0.09)
    return normalize_stereo(stereo(make_loop_friendly(left), make_loop_friendly(right)), target_rms=0.155)


def white_noise_track(rng: np.random.Generator) -> np.ndarray:
    noise = smooth_noise(rng, TOTAL_SAMPLES, "white")
    left = highpass(noise, 0.03)
    right = highpass(np.roll(noise, 149), 0.03)
    return normalize_stereo(stereo(make_loop_friendly(left), make_loop_friendly(right)), target_rms=0.145)


def ocean_track(rng: np.random.Generator) -> np.ndarray:
    t = time_axis()
    sea = lowpass(smooth_noise(rng, TOTAL_SAMPLES, "pink"), 0.018)
    long_swell = 0.18 + 0.82 * np.maximum(0.0, np.sin(2.0 * np.pi * 0.075 * t - 0.6))
    short_swell = 0.42 + 0.58 * np.maximum(0.0, np.sin(2.0 * np.pi * 0.16 * t + 0.7))
    undertow = lowpass(smooth_noise(rng, TOTAL_SAMPLES, "brown"), 0.008) * 0.31
    foam = highpass(smooth_noise(rng, TOTAL_SAMPLES, "white"), 0.08) * np.power(long_swell * short_swell, 2.15) * 0.62
    hiss = bandpass(smooth_noise(rng, TOTAL_SAMPLES, "white"), 0.012, 0.12) * np.power(short_swell, 1.8) * 0.12
    low_push = np.sin(2.0 * np.pi * 0.075 * t - 1.1) * 0.09
    left = sea * long_swell + undertow + foam + hiss + low_push
    right = np.roll(sea, 960) * np.roll(long_swell, 520) + np.roll(undertow, 280) + np.roll(foam, 440) + np.roll(hiss, 210) + np.roll(low_push, 120)
    left = add_echo(left, 0.18, 0.35, repeats=1)
    right = add_echo(right, 0.22, 0.35, repeats=1)
    return normalize_stereo(stereo(make_loop_friendly(left), make_loop_friendly(right)), target_rms=0.16)


def library_track(rng: np.random.Generator) -> np.ndarray:
    base = lowpass(smooth_noise(rng, TOTAL_SAMPLES, "brown"), 0.0055) * 0.1
    air = lowpass(smooth_noise(rng, TOTAL_SAMPLES, "pink"), 0.014) * 0.028
    pages = np.zeros(TOTAL_SAMPLES, dtype=np.float64)
    cursor = 4.8
    while cursor < DURATION_SECONDS - 1.0:
        start = int(cursor * SAMPLE_RATE)
        length = int(rng.uniform(0.4, 0.9) * SAMPLE_RATE)
        if start + length >= TOTAL_SAMPLES:
            break
        env = np.hanning(length)
        rustle = highpass(rng.normal(0.0, 0.05, length), 0.09)
        pages[start:start + length] += rustle * env * rng.uniform(0.08, 0.15)
        cursor += rng.uniform(6.8, 10.2)
    left = base + air + pages
    right = np.roll(base, 250) + np.roll(air, 90) + np.roll(pages, 180)
    return normalize_stereo(stereo(make_loop_friendly(left), make_loop_friendly(right)), target_rms=0.11)


def keyboard_track(rng: np.random.Generator) -> np.ndarray:
    bed = highpass(smooth_noise(rng, TOTAL_SAMPLES, "white"), 0.05) * 0.018
    clicks = np.zeros(TOTAL_SAMPLES, dtype=np.float64)
    cursor = 0.4
    while cursor < DURATION_SECONDS:
        start = int(cursor * SAMPLE_RATE)
        length = int(rng.uniform(0.016, 0.034) * SAMPLE_RATE)
        if start + length >= TOTAL_SAMPLES:
            break
        env = np.exp(-np.linspace(0.0, 6.5, length))
        local_t = np.arange(length) / SAMPLE_RATE
        switch = np.sin(2.0 * np.pi * rng.uniform(1450.0, 2350.0) * local_t)
        thock = np.sin(2.0 * np.pi * rng.uniform(160.0, 260.0) * local_t) * 0.42
        rattle = highpass(rng.normal(0.0, 0.55, length), 0.18) * 0.12
        clicks[start:start + length] += (switch * 0.58 + thock + rattle) * env * rng.uniform(0.18, 0.32)
        if rng.random() < 0.16:
            cursor += rng.uniform(0.32, 0.65)
        else:
            cursor += rng.uniform(0.07, 0.16)
    left = bed + clicks
    right = np.roll(bed, 60) + np.roll(clicks, 35)
    return normalize_stereo(stereo(make_loop_friendly(left), make_loop_friendly(right)), target_rms=0.135)


def piano_track(rng: np.random.Generator) -> np.ndarray:
    phrase = np.zeros(TOTAL_SAMPLES, dtype=np.float64)
    notes = [261.63, 329.63, 392.0, 523.25, 659.25, 587.33, 440.0]
    cursor = 0.0
    note_index = 0
    while cursor < DURATION_SECONDS - 1.8:
        start = int(cursor * SAMPLE_RATE)
        length = int(rng.uniform(1.4, 2.1) * SAMPLE_RATE)
        if start + length >= TOTAL_SAMPLES:
            break
        env = np.exp(-np.linspace(0.0, 4.9, length))
        base = notes[note_index % len(notes)]
        local_t = np.arange(length) / SAMPLE_RATE
        hammer = highpass(rng.normal(0.0, 0.18, length), 0.2) * np.exp(-np.linspace(0.0, 24.0, length))
        body = (
            0.61 * np.sin(2.0 * np.pi * base * local_t)
            + 0.2 * np.sin(2.0 * np.pi * base * 2.01 * local_t)
            + 0.11 * np.sin(2.0 * np.pi * base * 3.12 * local_t)
            + 0.08 * np.sin(2.0 * np.pi * base * 4.03 * local_t)
        )
        phrase[start:start + length] += (body * env * 0.18) + (hammer * 0.045)
        note_index += 1
        cursor += rng.uniform(1.2, 1.9)

    phrase = add_echo(phrase, 0.18, 0.32, repeats=3)
    felt = lowpass(smooth_noise(rng, TOTAL_SAMPLES, "pink"), 0.02) * 0.022
    left = phrase + felt
    right = np.roll(phrase, 460) + np.roll(felt, 120)
    return normalize_stereo(stereo(make_loop_friendly(left, 2.5), make_loop_friendly(right, 2.5)), target_rms=0.125)


def lofi_harmony(t: np.ndarray, root: float, wobble: float = 0.003) -> np.ndarray:
    detune = 1.0 + wobble * np.sin(2.0 * np.pi * 0.12 * t)
    return (
        0.58 * np.sin(2.0 * np.pi * root * detune * t)
        + 0.24 * np.sin(2.0 * np.pi * root * 1.25 * t)
        + 0.18 * np.sin(2.0 * np.pi * root * 1.5 * t)
    )


def beat_layer(rng: np.random.Generator, kick_interval: float, snare_offset: float, kick_gain: float, snare_gain: float) -> np.ndarray:
    output = np.zeros(TOTAL_SAMPLES, dtype=np.float64)
    for start in np.arange(0.0, DURATION_SECONDS, kick_interval):
        idx = int(start * SAMPLE_RATE)
        kick_len = int(0.12 * SAMPLE_RATE)
        if idx + kick_len < TOTAL_SAMPLES:
            env = np.exp(-np.linspace(0.0, 10.0, kick_len))
            freq = np.linspace(95.0, 48.0, kick_len)
            phase = np.cumsum(2.0 * np.pi * freq / SAMPLE_RATE)
            output[idx:idx + kick_len] += np.sin(phase) * env * kick_gain

        snare_start = start + snare_offset
        sidx = int(snare_start * SAMPLE_RATE)
        snare_len = int(0.09 * SAMPLE_RATE)
        if sidx + snare_len < TOTAL_SAMPLES:
            env = np.exp(-np.linspace(0.0, 14.0, snare_len))
            noise = highpass(rng.normal(0.0, 1.0, snare_len), 0.16)
            output[sidx:sidx + snare_len] += noise * env * snare_gain
    return output


def cafe_track(rng: np.random.Generator) -> np.ndarray:
    chords = np.zeros(TOTAL_SAMPLES, dtype=np.float64)
    roots = [220.0, 246.94, 196.0, 293.66]
    for bar, start in enumerate(np.arange(0.0, DURATION_SECONDS, 4.0)):
        idx = int(start * SAMPLE_RATE)
        length = int(3.8 * SAMPLE_RATE)
        if idx + length >= TOTAL_SAMPLES:
            break
        env = np.exp(-np.linspace(0.0, 2.8, length))
        local_t = np.arange(length) / SAMPLE_RATE
        chord = lofi_harmony(local_t, roots[bar % len(roots)], wobble=0.0018)
        sparkle = 0.08 * np.sin(2.0 * np.pi * roots[bar % len(roots)] * 2.5 * local_t)
        chords[idx:idx + length] += (chord * 0.18 + sparkle) * env

    beat = beat_layer(rng, kick_interval=0.5, snare_offset=0.25, kick_gain=0.1, snare_gain=0.035)
    hiss = lowpass(smooth_noise(rng, TOTAL_SAMPLES, "pink"), 0.03) * 0.02
    room = bandpass(smooth_noise(rng, TOTAL_SAMPLES, "brown"), 0.0008, 0.01) * 0.01
    vinyl = highpass(smooth_noise(rng, TOTAL_SAMPLES, "white"), 0.018) * 0.01
    left = chords + beat + hiss + room
    right = np.roll(chords, 320) + np.roll(beat, 120) + np.roll(hiss, 70) + np.roll(room, 150) + np.roll(vinyl, 45)
    left += vinyl
    return normalize_stereo(stereo(make_loop_friendly(left, 2.2), make_loop_friendly(right, 2.2)), target_rms=0.145)


def lofi_track(rng: np.random.Generator) -> np.ndarray:
    t = time_axis()
    pad = np.zeros(TOTAL_SAMPLES, dtype=np.float64)
    roots = [174.61, 207.65, 233.08, 196.0]
    for bar, start in enumerate(np.arange(0.0, DURATION_SECONDS, 4.0)):
        idx = int(start * SAMPLE_RATE)
        length = int(3.95 * SAMPLE_RATE)
        if idx + length >= TOTAL_SAMPLES:
            break
        env = np.exp(-np.linspace(0.0, 2.3, length))
        local_t = np.arange(length) / SAMPLE_RATE
        chord = lofi_harmony(local_t, roots[bar % len(roots)], wobble=0.004)
        melody = 0.1 * np.sin(2.0 * np.pi * (roots[bar % len(roots)] * 2.0) * local_t)
        pad[idx:idx + length] += (chord * 0.18 + melody) * env

    beat = beat_layer(rng, kick_interval=0.5, snare_offset=0.25, kick_gain=0.16, snare_gain=0.06)
    vinyl = highpass(smooth_noise(rng, TOTAL_SAMPLES, "white"), 0.02) * 0.015
    wobble = 0.012 * np.sin(2.0 * np.pi * 0.08 * t)
    bass = np.sin(2.0 * np.pi * (87.31 + wobble) * t) * (0.08 + 0.04 * np.sin(2.0 * np.pi * 0.5 * t))
    left = pad + beat + vinyl + bass
    right = np.roll(pad, 280) + np.roll(beat, 90) + np.roll(vinyl, 40) + np.roll(bass, 120)
    return normalize_stereo(stereo(make_loop_friendly(left, 2.0), make_loop_friendly(right, 2.0)), target_rms=0.15)


def generate_all() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    rng = np.random.default_rng(SEED)

    tracks = {
        "rain.wav": rain_track,
        "white-noise.wav": white_noise_track,
        "ocean.wav": ocean_track,
        "cafe.wav": cafe_track,
        "library.wav": library_track,
        "keyboard.wav": keyboard_track,
        "piano.wav": piano_track,
        "lofi.wav": lofi_track,
    }

    for filename, builder in tracks.items():
        signal = builder(rng)
        write_wav(OUTPUT_DIR / filename, signal)
        print(f"generated {filename}")


if __name__ == "__main__":
    generate_all()
