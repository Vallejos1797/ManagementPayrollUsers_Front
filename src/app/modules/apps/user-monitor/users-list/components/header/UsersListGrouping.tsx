import {useListView} from '../../core/ListViewProvider'
import {initialQueryState, KTIcon} from "../../../../../../../_metronic/helpers";
import {generateReportUsers} from "../../core/_requestsUsers";


const UsersListGrouping = () => {
    const {selected} = useListView()

    const filterData = async () => {
        try {
            // TO DO: Capturar los filtros y pasarlos como argumento a generateReportUsers si es necesario
            console.log('Va a consumir con:', selected, initialQueryState);

            const response = await generateReportUsers({selected}); // Llamada a generateReportUsers para obtener la respuesta

            // Verificar si la respuesta es válida y contiene un Blob
            if (response && response instanceof Blob) {
                 // Asignar el Blob obtenido de la respuesta
                // Crear un objeto URL del blob
                const url = window.URL.createObjectURL(response);

                // Crear un enlace para descargar el archivo
                const a = document.createElement('a');
                a.href = url;
                a.download = 'nombre_del_archivo.xlsx'; // Nombre del archivo que deseas
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error('Error en la descarga del archivo:', error);
            // Manejar el error en caso de fallo en la descarga
        }
    };



    return (
        <div className='d-flex justify-content-end align-items-center'>
            <div className='fw-bolder me-5'>
                <span className='me-2'>{selected.length}</span> Selected
            </div>
            <button
                type='button'
                className='btn btn-light-primary me-3'
                onClick={filterData}
            >
                <KTIcon iconName='exit-up' className='fs-2'/>
                Export
            </button>

        </div>
    )
}

export {UsersListGrouping}
