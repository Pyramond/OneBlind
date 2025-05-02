import { CloseButton, Text } from "@mantine/core";
import {useDispatch} from "react-redux";
import {removeChip, setChips} from "../redux/slices/chips.js";
import {get_all_chips, remove_chip} from "../utils/chips.js";

export default function Chip(props) {

    const dispatch = useDispatch();

    async function fetchData() {
        const data = await get_all_chips();
        dispatch(setChips(data))
    }

    async function remove() {
        await remove_chip(props.id);
        fetchData()
    }

    return <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>

        <CloseButton onClick={remove} />
        <Text> {props.color}: {props.value} </Text>

    </div>
}