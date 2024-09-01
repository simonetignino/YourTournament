import { useState } from "react";

export default function EditTournament() {

    const [tournament, setTournament] = useState({
        name: "",
        image: "",
        description: "",
        price: "",
        rules: "",
        location: "",
        startDate: "",
        endRegistrationDate: "",
        game: "",
        organizer: "",
        prize: "",
        private: true,
        partecipants: "",
        format: "",
        status: "In Arrivo",
      });

    return (
        
    )
}