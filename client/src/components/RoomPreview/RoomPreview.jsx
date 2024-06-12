import React, { useState } from 'react';
import styles from "./styles.module.css";

const RoomPreview = ({ 
    room_number, 
    room_description, 
    room_capacity, 
    room_occupancy 
}) => {

//green = clean open
//yellow = maintenence req
//red = occupied or out of service

    return (
        <div className={styles.roomview}>
            <div className={styles.numberview}>
                <div className={styles.label}>Room</div>
                <div className={styles.number}>{room_number}</div>
            </div>
            <div className={styles.descriptionview}>
                <div className={styles.roomdescription}>
                    <div className={styles.descriptiontext}>
                        {room_description}
                    </div>
                </div>
                <div className={styles.capacityview}>
                    <div className={styles.label}>Sleeps</div>
                    <div className={styles.number}>{room_capacity}</div>
                </div>
            </div>
            <div className={styles.occupancyview}></div>
        </div>
    )
}

RoomPreview.defaultProps = {
    room_number: "#", 
    room_description: "No description found.", 
    room_capacity: "0", 
    room_occupancy: null,
};

export default RoomPreview;