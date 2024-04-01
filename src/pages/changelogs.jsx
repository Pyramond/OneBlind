import { Title, Text, Group, Space } from "@mantine/core"
import data from "../assets/changelogs.json"


export default function ChangelogsPage() {
    return (
        <>
            {data.map((changelog, index) => (

                <div key={index}>

                    <Group>
                        <Title order={1}>Oneblind {changelog.version}</Title>
                        <Text style={{ opacity: "0.5", marginTop: "1em" }}>{changelog.date}</Text>
                    </Group>

                    <div style={{ marginTop: "3em" }}>
                        {changelog.changes.map((change, index) => (
                            <Text key={index}>- {change}</Text>
                        ))}
                    </div>

                    <Space h="8em" />

                </div>
            ))}
        </>
    )
}