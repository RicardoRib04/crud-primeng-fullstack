import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tutor } from '../models/tutor';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TutorService {

    private apiUrl = 'http://localhost:3000/tutors'; // Adjust if your backend URL is different

    constructor(private http: HttpClient) { }

    getTutors(): Observable<Tutor[]> {
        return this.http.get<Tutor[]>(this.apiUrl, { headers: this.getAuthHeaders() });
    }

    createTutor(tutor: Tutor): Observable<Tutor> {
        return this.http.post<Tutor>(this.apiUrl, tutor, { headers: this.getAuthHeaders() });
    }

    updateTutor(id: number, tutor: Tutor): Observable<Tutor> {
        return this.http.put<Tutor>(`${this.apiUrl}/${id}`, tutor, { headers: this.getAuthHeaders() });
    }

    deleteTutor(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
    }

    private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('token'); // Or wherever you store the JWT
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }
}
