"use client"

import { Marker, Popup, } from 'react-leaflet'
import Leaflet from 'leaflet'
import Link from 'next/link'

import './blockMarkerStyles.scss'
import Image from 'next/image'

const mapIcon = Leaflet.icon({
    iconUrl: '/party.png',
    iconSize: [50, 50],
})


interface BlockMarkerParams {
    name?: string,
    position: {
        lat: number,
        lng: number
    },
    id?: string,
    image?: string
}


export default function BlockMarker({
    name,
    position,
    id,
    image
}: BlockMarkerParams) {
    return (
        <Marker
            icon={mapIcon}
            position={[position.lat, position.lng]}
        >
            {
                name && (
                    <Popup minWidth={240} maxWidth={240}>
                        <p>{name}</p>
                        <Image
                            src={image ?? ""}
                            alt="marker"
                            height={500}
                            width={500}
                        />
                        <Link href={`/blocos/${id}`}>
                            <label>ver</label>
                        </Link>
                    </Popup>
                )
            }
        </Marker>
    )
}