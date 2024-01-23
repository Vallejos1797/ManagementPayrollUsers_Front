export const transformDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return options? new Date(date).toLocaleDateString('es-ES', options): 'Undefined date';
};
