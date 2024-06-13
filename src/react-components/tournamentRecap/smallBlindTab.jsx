import { Table, ScrollArea  } from "@mantine/core"


export default function SmallBlindTab(props) {

    const steps = props.steps

    return  <ScrollArea h={435} id="blindModelTable">
    
        <Table verticalSpacing="sm" highlightOnHover>

            <Table.Thead>
                <Table.Tr>
                    <Table.Th>#</Table.Th>
                    <Table.Th>Type</Table.Th>
                    <Table.Th>Temps</Table.Th>
                    <Table.Th>Petite Blind</Table.Th>
                    <Table.Th>Grande Blind</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {steps.map((step, index) => (
                    <Table.Tr key={index}>
                        <Table.Td> {step.order} </Table.Td>
                        <Table.Td> {step.type} </Table.Td>
                        <Table.Td> {step.time}' </Table.Td>
                        <Table.Td> {step.sb} </Table.Td>
                        <Table.Td> {step.sb * 2} </Table.Td>
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
    </ScrollArea>
}