export const SEED_DATA = {
    processes: [
        { id: '1', name: 'CRUDO', area: 'Crudo' },
        { id: '2', name: 'CLINKER', area: 'Horno' },
        { id: '3', name: 'CEMENTO', area: 'Molienda Cemento' }
    ],
    procedures: [
        {
            id: '101',
            process_id: '1',
            name: 'Inspección de equipos en el área del Molino',
            equipment: 'Toda el área de Molienda de Crudo',
            frequency: 'Periódicamente durante el Turno'
        },
        {
            id: '102',
            process_id: '1',
            name: 'Inspección diaria en el área de Materias Primas',
            equipment: 'Área de Materias Primas',
            frequency: 'Diaria'
        }
    ],
    steps: {
        '101': [
            {
                id: 's1',
                step_number: 1,
                description: 'Verificar uso de EPP (Casco, Gafas, Botas, Protección Auditiva) antes de ingresar al área.',
                risks: 'Caídas a nivel, Golpes',
                safety_standard: 'Uso de EPP obligatorio'
            },
            {
                id: 's2',
                step_number: 2,
                description: 'Inspeccionar visualmente toda el área de Molienda de Crudo, identificando derrames o condiciones inseguras.',
                risks: 'Atrapamiento, Quemaduras',
                safety_standard: 'Orden y Aseo en el área'
            },
            {
                id: 's3',
                step_number: 3,
                description: 'Revisar de forma periódica durante el turno los niveles de lubricación y temperatura.',
                risks: 'Atrapamiento',
                safety_standard: 'Uso de EPP'
            }
        ],
        '102': [
            {
                id: 's4',
                step_number: 1,
                description: 'Limpieza en los chutes de transferencia de las bandas.',
                risks: 'Caídas a nivel, Golpes',
                safety_standard: 'Plataforma de acceso limpia'
            }
        ]
    }
};
