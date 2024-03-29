import "react-big-calendar/lib/css/react-big-calendar.css";

import { Calendar, momentLocalizer } from "react-big-calendar";
import React, { useEffect, useState } from "react";

import RaceModal from "../components/RaceModal";
import WorkoutModal from "../components/WorkoutModal";
import axios from "axios";
import moment from "moment";

const localizer = momentLocalizer(moment);

const CalendarWorkouts = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const jwtToken = localStorage.getItem("jwtToken");
                const workoutResponse = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/api/v1/workouts`,
                    { headers: { Authorization: `Bearer ${jwtToken}` } }
                );
                const raceResponse = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/api/v1/races`,
                    { headers: { Authorization: `Bearer ${jwtToken}` } }
                );

                const workoutEvents = workoutResponse.data.workouts.map(
                    (workout) => ({
                        id: workout._id,
                        title: workout.workoutType,
                        start: moment(workout.date).add(12, "hours").toDate(),
                        end: moment(workout.date)
                            .add(workout.duration, "minutes")
                            .add(12, "hours")
                            .toDate(),
                        duration: workout.duration,
                        intensity: workout.intensity,
                        indoor: workout.indoor,
                        date: workout.date,
                        description: workout.description,
                        type: "workout",
                    })
                );

                const raceEvents = raceResponse.data.races.map((race) => ({
                    id: race._id,
                    race: race.race,
                    title: race.title,
                    start: moment(race.date).add(12, "hours").toDate(),
                    end: moment(race.date)
                        .add(race.timeOfCompletion.hours, "hours")
                        .add(race.timeOfCompletion.minutes, "minutes")
                        .add(12, "hours")
                        .toDate(),
                    timeOfCompletion: `${race.timeOfCompletion.hours}h ${race.timeOfCompletion.minutes}m`,
                    location: `${race.location.city}, ${race.location.state}`,
                    date: race.date,
                    description: race.description,
                    type: "race",
                }));

                // console.log(raceEvents);

                setEvents([...workoutEvents, ...raceEvents]);
                // updateRaceData([...workoutEvents, ...raceEvents]);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const eventStyleGetter = (event, isSelected) => {
        const backgroundColor =
            event.type === "workout" ? "#298984" : "#74629B";
        const borderColor = isSelected ? "#fff" : "transparent";
        const textColor = isSelected ? "#fff" : "#000";
        return {
            style: {
                backgroundColor,
                borderColor,
                color: textColor,
            },
        };
    };

    const CustomEvent = ({ event }) => (
        <div>
            <strong>{event.title.toUpperCase()}</strong>
        </div>
    );

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        console.log(event);
        setModalVisible(true);
    };

    const handleWorkoutDelete = async () => {
        try {
            const workoutId = selectedEvent.id;
            setEvents(events.filter((event) => event.id !== workoutId));
            setModalVisible(false);
        } catch (error) {
            console.error("Error deleting workout:", error);
        }
    };

    const handleRaceDelete = async () => {
        try {
            const raceId = selectedEvent.id;
            setEvents(events.filter((event) => event.id !== raceId));
            setModalVisible(false);
            
        } catch (error) {
            console.error("Error deleting race:", error);
        }
    };

    const renderModal = () => {
        if (!selectedEvent) return null;

        if (selectedEvent.type === "workout") {
            return (
                <WorkoutModal
                    event={selectedEvent}
                    onClose={() => setModalVisible(false)}
                    onDelete={handleWorkoutDelete}
                />
            );
        } else if (selectedEvent.type === "race") {
            return (
                <RaceModal
                    event={selectedEvent}
                    onClose={() => setModalVisible(false)}
                    onDelete={handleRaceDelete}
                />
            );
        }

        return null;
    };

    return (
        <section className="bg-gradient-to-t from-custom-color to-blue-500 min-h-screen flex items-start justify-center font-nunito">
            <div className="w-full max-w-4xl p-4 text-white">
                <h2 className="text-2xl font-semibold text-white mb-6">
                    Training and races
                </h2>
                {loading ? (
                    <p className="text-white">Loading...</p>
                ) : (
                    <>
                        <Calendar
                            localizer={localizer}
                            events={events}
                            titleAccessor="title"
                            eventPropGetter={eventStyleGetter}
                            views={["month", "week", "day"]}
                            defaultDate={new Date()}
                            defaultView="month"
                            style={{ height: 600, color: "white" }}
                            components={{
                                event: CustomEvent,
                            }}
                            onSelectEvent={handleEventClick}
                        />
                        {modalVisible && renderModal()}
                    </>
                )}
            </div>
        </section>
    );
};

export default CalendarWorkouts;
