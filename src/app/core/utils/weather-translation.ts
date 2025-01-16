import moment from 'moment-timezone';

// Traducción de descripción del clima
export const translate = (description: string): string => {
  switch (description) {
    case 'moderate rain':
      return 'Lluvia moderada';
    case 'few clouds':
      return 'Nubes dispersas';
    case 'sky is clear':
      return 'Cielo despejado';
    case 'light rain':
      return 'Lluvia ligera';
    case 'overcast clouds':
      return 'Nublado';
    default:
      return description; // Devuelve la descripción tal cual si no hay traducción
  }
};

// Traducción del mes
export const translateMes = (month: number): string => {
  const fechaMoment = moment(month * 1000).tz("Europe/Madrid").format("MMMM");
  const mesTraducido: { [key: string]: string } = {
    "January": "Enero",
    "February": "Febrero",
    "March": "Marzo",
    "April": "Abril",
    "May": "Mayo",
    "June": "Junio",
    "July": "Julio",
    "August": "Agosto",
    "September": "Septiembre",
    "October": "Octubre",
    "November": "Noviembre",
    "December": "Diciembre"
  };

  return `${moment(month * 1000).tz("Europe/Madrid").format("DD")} de ${mesTraducido[fechaMoment] || fechaMoment}`;
};

export const translateDias = (day: string): string => {
  // Extrae solo la parte de la fecha (asumiendo que el formato es 'YYYY-MM-DD HH:mm:ss')
  const fechaMoment = moment(day.split(' ')[0], 'YYYY-MM-DD').tz("Europe/Madrid").format("dddd");

  const diaTraducido: { [key: string]: string } = {
    "Monday": "Lunes",
    "Tuesday": "Martes",
    "Wednesday": "Miércoles",
    "Thursday": "Jueves",
    "Friday": "Viernes",
    "Saturday": "Sábado",
    "Sunday": "Domingo"
  };

  return `${diaTraducido[fechaMoment] || fechaMoment} ${moment(day.split(' ')[0], 'YYYY-MM-DD').tz("Europe/Madrid").format("D")}`;
};