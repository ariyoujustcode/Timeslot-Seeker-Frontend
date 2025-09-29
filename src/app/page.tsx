"use client";

import { useState } from "react";

interface TimeSlot {
    start: string;
    end: string;
}

export default function HomePage() {
    const [participants, setParticipants] = useState("");
    const [slotLength, setSlotLength] = useState(30);
    const [weeks, setWeeks] = useState(1);
    const [slots, setSlots] = useState<TimeSlot[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("http://localhost:8000/find-timeslot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    participants: participants.split(",").map((p) => p.trim()),
                    slot_length: slotLength,
                    weeks,
                }),
            });

            const data = await res.json();
            setSlots(data.slots || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-50 to-white">
            <h1 className="text-3xl font-bold mb-6 text-blue-700">
                Timeslot Seeker
            </h1>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-xl shadow-lg"
            >
                <input
                    type="text"
                    placeholder="Participant emails, comma-separated"
                    value={participants}
                    onChange={(e) => setParticipants(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    required
                />

                {/* Preset buttons */}
                {/* Preset buttons */}
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => setSlotLength(30)}
                        className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                            slotLength === 30
                                ? "bg-blue-600 text-white"
                                : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                        }`}
                    >
                        30 minutes
                    </button>
                    <button
                        type="button"
                        onClick={() => setSlotLength(60)}
                        className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                            slotLength === 60
                                ? "bg-blue-600 text-white"
                                : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                        }`}
                    >
                        60 minutes
                    </button>
                </div>

                {/* Custom slot length (independent of buttons) */}
                {/* Custom slot length */}
                <input
                    type="number"
                    placeholder="Custom slot length (minutes)"
                    value={slotLength}
                    min={5}
                    max={480}
                    step={5}
                    onChange={(e) => {
                        const val = e.target.value;
                        // Allow only numbers up to 3 digits
                        if (/^\d{0,3}$/.test(val)) {
                            setSlotLength(Number(val));
                        }
                    }}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />

                {/* Weeks input */}
                <input
                    type="number"
                    placeholder="Weeks to search"
                    value={weeks}
                    min={1}
                    max={4}
                    step={1}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d{0,1}$/.test(val)) {
                            // only allow 1 digit
                            setWeeks(Number(val));
                        }
                    }}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                    {loading ? "Searching..." : "Find Slots"}
                </button>
            </form>

            {slots.length > 0 && (
                <div className="mt-8 w-full max-w-md">
                    <h2 className="text-2xl font-semibold mb-4 text-blue-700">
                        Available Slots
                    </h2>
                    <div className="grid gap-3">
                        {slots.map((slot) => (
                            <div
                                key={slot.start}
                                className="p-4 bg-blue-50 rounded-lg shadow hover:bg-blue-100 transition-colors"
                            >
                                <p className="font-medium">
                                    {new Date(slot.start).toLocaleString()} -{" "}
                                    {new Date(slot.end).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </main>
    );
}
