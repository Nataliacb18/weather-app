import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = 'f1d96d875d9f33886a3edbfb4ef5081b';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error al obtener los datos';

    if (error.status === 400) {
      errorMessage = error.error.message || 'Solicitud incorrecta. Revisa los datos proporcionados.';
    } else if (error.status === 401) {
      errorMessage = 'Clave API inválida. Por favor, verifica tu clave.';
    } else if (error.status === 403) {
      errorMessage = 'Acceso denegado. No tienes permisos para acceder a estos datos.';
    } else if (error.status === 404) {
      errorMessage = 'Ciudad no encontrada.';
    } else if (error.status >= 500) {
      errorMessage = 'Error en el servidor. Intenta más tarde.';
    }

    return throwError(() => new Error(errorMessage));
  }
}
