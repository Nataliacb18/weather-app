import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WeatherService } from '../../../../core/services/weather/weather.service';
import { firstValueFrom } from 'rxjs';
import { translateDias } from '../../../../core/utils/weather-translation';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnChanges {
  @Input() city: string = '';
  @Input() errorMessage: string = '';
  weatherData: any;
  forecast: any[] = [];
  sunrise: string = '';
  sunset: string = '';
  cityNotFound: boolean = false;

  constructor(private weatherService: WeatherService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['city'] && this.city) {
      this.getWeather();
    }
  }

  getWeather() {
    if (this.city) {
      firstValueFrom(this.weatherService.getWeather(this.city))
        .then((data: any) => {
          this.sunrise = this.formatTime(data.city.sunrise);
          this.sunset = this.formatTime(data.city.sunset);
          this.forecast = this.filterForecast(data);
          this.errorMessage = '';
          this.cityNotFound = false;
        })
        .catch((error: any) => {
          this.cityNotFound = true;
          this.errorMessage = error.message;
          console.error('Error fetching weather data', error);
        });
    }
  }

  // Función para convertir el tiempo Unix en formato de 24 horas
  formatTime(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${formattedMinutes}`;
  }

  filterForecast(data: any): any[] {
    console.log(data);

    const filteredData: any[] = [];
    const seenDates: Set<string> = new Set();

    for (const entry of data.list) {
      const date = entry.dt_txt.split(' ')[0];  // Obtener solo la fecha (sin la hora)
      if (entry.dt_txt.includes('12:00:00') && !seenDates.has(date)) {
        // Traducir el día
        entry.translatedDay = translateDias(entry.dt_txt);  // Asignamos el día traducido
        filteredData.push(entry);
        seenDates.add(date);
        if (filteredData.length === 5) break;  // Limitar a 5 días
      }
    }

    console.log(filteredData);
    return filteredData;
  }

  getWeatherIcon(iconCode: string): string {
    switch (iconCode) {
      case '01d': return '../../../../assets/icons/sol.png';
      case '01n': return '../../../../assets/icons/sol.png';
      case '02d': return '../../../../assets/icons/nubes.png';
      case '02n': return '../../../../assets/icons/nubes.png';
      case '03d': return '../../../../assets/icons/nubes.png';
      case '03n': return '../../../../assets/icons/nubes.png';
      case '04d': return '../../../../assets/icons/nubes.png';
      case '04n': return '../../../../assets/icons/nubes.png';
      case '09d': return '../../../../assets/icons/lluvia.png';
      case '09n': return '../../../../assets/icons/lluvia.png';
      case '10d': return '../../../../assets/icons/lluvia.png';
      case '10n': return '../../../../assets/icons/lluvia.png';
      case '11d': return '../../../../assets/icons/aguacero.png';
      case '11n': return '../../../../assets/icons/aguacero.png';
      case '13d': return '../../../../assets/icons/nieve.png';
      case '13n': return '../../../../assets/icons/nieve.png';
      case '50d': return '../../../../assets/icons/niebla.png';
      case '50n': return '../../../../assets/icons/niebla.png';
      default: return '../../../../assets/icons/desconocido.png';
    }
  }
}

