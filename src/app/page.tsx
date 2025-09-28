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

                <input
                    type="number"
                    placeholder="Slot length (minutes)"
                    value={slotLength}
                    onChange={(e) => setSlotLength(Number(e.target.value))}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    required
                />

                <input
                    type="number"
                    placeholder="Weeks to search"
                    value={weeks}
                    onChange={(e) => setWeeks(Number(e.target.value))}
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
