// root/js/services/inputService.js
import { supabaseClient } from './supabaseClient.js';

export const inputService = {
    /**
     * Menyimpan aktivitas lari baru ke Supabase
     * @param {Object} formData - Data mentah dari form Vue
     * @returns {Promise<Object>} - Mengembalikan data atau melempar error
     */
    async saveRunActivity(formData) {
        // Gabungkan tanggal dan jam lokal menjadi satu format ISO UTC untuk DB
        const gabungWaktuISO = new Date(`${formData.date}T${formData.time}:00`).toISOString();

        // Susun payload agar pas dengan struktur kolom tabel run_activities
        const payload = {
            nama: formData.nama || 'Aktivitas Lari Tanpa Nama',
            jenis_latihan: formData.jenis_latihan || 'General Running',
            tanggal: formData.date,
            waktu_mulai_iso: gabungWaktuISO, 
            metrik_utama: formData.metrik_utama,
            splits: formData.splits,
            laps: formData.laps,
            zona_pace: formData.zona_pace.map(z => ({
                kode: z.kode,
                nama: z.nama,
                persentase: z.persentase || 0,
                durasi: z.durasi || 0
            })),
            evaluasi: formData.evaluasi
        };

        const { data, error } = await supabaseClient
            .from('run_activities')
            .insert([payload])
            .select(); // Mengembalikan data yang baru dimasukkan jika diperlukan

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }
};
