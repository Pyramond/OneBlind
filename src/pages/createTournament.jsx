import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDate, getTimeStamp } from "../utils/date";
import { getAllPlayer } from "../utils/players";
import { getAllModels } from "../utils/models";
import { change } from "../redux/slices/reload";
import { addTournament } from '../utils/tournaments';
import { IconDeviceFloppy } from "@tabler/icons-react"
import {
	TextInput,
	NumberInput,
	Menu,
	Button,
	Title,
	Group,
	Stack,
	Checkbox,
	MultiSelect
} from '@mantine/core';
import { notifications } from '@mantine/notifications'
import { useNavigate } from 'react-router-dom';
import CreatePlayerTournament from "../react-components/createPlayerTournament.jsx";

export default function CreateTournament() {

	const t = useSelector((state) => state.reload);
	const dispatch = useDispatch();
	const effectDependency = useMemo(() => ({ value: t.value, random: Math.random() }), [t.value]);
	const navigate = useNavigate()

	const date = getDate()
	const [blind, setBlind] = useState("Modèle");
	const [players, setPlayers] = useState([]);
	const [tournamentName, setTournamentName] = useState(`Tournoi ${date}`)
	const [allPLayers, setAllPlayers] = useState([])
	const [initialChips, setInitialChips] = useState(0)
	const [allModels, setAllModels] = useState([])
	const [selectedModel, setSelectedModel] = useState({})
	const [points, setPoints] = useState(true)
	const [multiSelectData, setMultiSelectData] = useState([])

	const handlePlayers = (values) => {
		const selectedObjects = values.map((value) => {
			return allPLayers.find(player => player.id.toString() === value)
		})
		setPlayers(selectedObjects)
	}

	const handleBlindSelect = (selectedModelId) => {
		const i = allModels.find(model => model.id === parseInt(selectedModelId))
		setSelectedModel(i)
		setBlind(i.name)
	};
	const handleChangeName = (event) => { setTournamentName(event.target.value) }

	async function create(event) {
		event.preventDefault()

		if(players.length <= 2 || initialChips === 0 || Object.keys(selectedModel).length === 0) {
			notifications.show({
				title: "Erreur",
				message: "Certains champs obligatoires n'ont pas été remplis",
				color: "red"
			})
		} else {
			const blindObject = {
				"name": selectedModel.name,
				"id": selectedModel.id
			}
			await addTournament(tournamentName, getTimeStamp(), blindObject, players, initialChips, points)
			dispatch(change())

			notifications.show({
				title: tournamentName,
				message: "Le tournois à été créer"
			})

			navigate("/tournament")
		}
	}

	useEffect(() => {
		getAllPlayer().then(players => {
			setAllPlayers(players)
			setMultiSelectData(players.map((player) => ({
				value: player.id.toString(),
				label: player.name
			})))
		});

		getAllModels().then(models => {
			setAllModels(models)
		});
	}, [effectDependency])

	return (
		<div id="createTournament">
			<Stack>

				<Title order={1}>Créer un tournoi</Title>

				<Stack id="form-component">
					<Title order={5}>Nom du tournois</Title>
					<TextInput
						placeholder="Nom du tournois"
						onChange={handleChangeName}
						id="textInput"
					/>
				</Stack>

				<Group>
					<Stack id="form-component">
						<Title order={5}>Structure de blind</Title>
						<Menu>
							<Menu.Target>
								<Button variant="default"> {blind} </Button>
							</Menu.Target>
							<Menu.Dropdown>
								{allModels.map((model, index) => (
									<Menu.Item key={index} onClick={() => { handleBlindSelect(model.id)}}>{model.name}</Menu.Item>
								))}
							</Menu.Dropdown>
						</Menu>
					</Stack>

					<Stack id="form-component">
						<Title order={5}>Tapis de départ</Title>
						<NumberInput
							placeholder="Tapis de départ:"
							value={initialChips}
							onChange={setInitialChips}
						/>
					</Stack>
				</Group>

				<Stack id="form-component">
					<Title order={5}>Liste de joueurs</Title>
					<Group>

						<MultiSelect
							placeholder="Séléctionner un joueur"
							data={multiSelectData}
							onChange={handlePlayers}
						/>

						<CreatePlayerTournament />

					</Group>
				</Stack>

				<Checkbox
					checked={points}
					onChange={(event) => setPoints(event.currentTarget.checked)}
					label="Compter les points pour ce tournoi"
				/>

				<Button variant="primary" onClick={create} rightSection={<IconDeviceFloppy />} id="form-button">Sauvegarder</Button>

			</Stack>

		</div>
	);
}
