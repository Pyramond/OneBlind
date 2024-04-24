import { Avatar } from '@mantine/core';
import { getPlayerById } from '../../utils/players';
import { useEffect, useState } from 'react';
import { defineAvatar } from '../../utils/avatars';


export default function PlayerItem(props) {

    const [avatarURL, setAvatarURL] = useState("")

    useEffect(() => {
        async function getData() {
            const r = await getPlayerById(props.id)
            setAvatarURL(defineAvatar(r.name, r.avatar, r.avatarColor))
        }
        getData()
    }, [])

    return <div id="playerItem">
        <Avatar src={avatarURL} size="lg" />
        <p>{props.name}</p>
        <p>{props.place}</p>
    </div>
}