// root/components/inputModal.js
import inputView from './inputView.js';

export default {
    name: 'InputModal',
    template: inputView,
    emits: ['close-input', 'refresh-data'],
    data() {
        // Mendapatkan waktu lokal gawai saat ini untuk pengisian otomatis awal form
        const sekarang = new Date();
        const localDate = sekarang.toISOString().substring(0, 10);
        const localTime = sekarang.toTimeString().substring(0, 5);

        return {
            form: {
                nama: '',
                jenis_latihan: '',
                date: localDate,
                time: localTime,
                metrik_utama: {
                    jarak: '',
                    avg_pace: '',
                    rpe: '',
                    move_time: '',
                    elevation_gain: '',
                    fastest_split: '',
                    avg_cadence: '',
                    post_hr: '',
                    catatan_efisiensi: ''
                },
                splits: [
                    { km: 1, pace: '', catatan: '' } // 1 baris default awal
                ],
                laps: [
                    { lap: 1, jarak: '', waktu: '', pace: '', cadence: '', stride: '' } // 1 baris default awal
                ],
                zona_pace: [
                    { kode: 'Z6', nama: 'Anaerobik', rentang: '< 5:25 /km', warna: 'bg-red-600', persentase: '', durasi: '' },
                    { kode: 'Z5', nama: 'VO2 Max', rentang: '5:25 – 5:55 /km', warna: 'bg-orange-500', persentase: '', durasi: '' },
                    { kode: 'Z4', nama: 'Threshold', rentang: '5:55 – 6:25 /km', warna: 'bg-amber-500', persentase: '', durasi: '' },
                    { kode: 'Z3', nama: 'Tempo', rentang: '6:25 – 7:05 /km', warna: 'bg-emerald-500', persentase: '', durasi: '' },
                    { kode: 'Z2', nama: 'Endurance', rentang: '7:05 – 7:50 /km', warna: 'bg-blue-500', persentase: '', durasi: '' },
                    { kode: 'Z1', nama: 'Recovery', rentang: '> 7:50 /km', warna: 'bg-slate-400', persentase: '', durasi: '' }
                ],
                evaluasi: {
                    fisik: '',
                    cuaca_rute: '',
                    rencana: ''
                }
            }
        }
    },
    methods: {
        closeInput() {
            this.$emit('close-input');
        },
        // Fungsi manipulasi data Split Kilometer
        addSplitRow() {
            const nextKM = this.form.splits.length + 1;
            this.form.splits.push({ km: nextKM, pace: '', catatan: '' });
            this.refreshLucideIcons();
        },
        removeSplitRow(index) {
            this.form.splits.splice(index, 1);
            this.form.splits.forEach((split, idx) => { split.km = idx + 1; });
        },
        // Fungsi manipulasi data Putaran (Laps)
        addLapRow() {
            const nextLap = this.form.laps.length + 1;
            this.form.laps.push({ lap: nextLap, jarak: '', waktu: '', pace: '', cadence: '', stride: '' });
            this.refreshLucideIcons();
        },
        removeLapRow(index) {
            this.form.laps.splice(index, 1);
            this.form.laps.forEach((lap, idx) => { lap.lap = idx + 1; });
        },
        refreshLucideIcons() {
            this.$nextTick(() => {
                if (window.lucide) window.lucide.createIcons();
            });
        },
        // Aksi Submit dan Konversi Waktu ke ISO
        async saveTransaction() {
            // Penggabungan waktu Input Lokal menjadi ISO standardisasi UTC Database
            const gabungWaktuISO = new Date(`${this.form.date}T${this.form.time}:00`).toISOString();

            // Payload bersih JSON Object terstruktur rapi untuk ditangkap kolom data Supabase
            const payload = {
                nama: this.form.nama || 'Aktivitas Lari Tanpa Nama',
                jenis_latihan: this.form.jenis_latihan || 'General Running',
                tanggal: this.form.date,
                waktu_mulai_iso: gabungWaktuISO, 
                metrik_utama: this.form.metrik_utama,
                splits: this.form.splits,
                laps: this.form.laps,
                zona_pace: this.form.zona_pace.map(z => ({
                    kode: z.kode,
                    nama: z.nama,
                    persentase: z.persentase || 0,
                    durasi: z.durasi || 0
                })),
                evaluasi: this.form.evaluasi
            };

            console.log('Payload data lari ter-refactor:', payload);
            
            // Catatan Integrasi: Di bagian script utama layout/main, Anda tinggal menjalankan:
            // const { data, error } = await supabaseClient.from('nama_tabel').insert([payload]);
            
            this.$emit('refresh-data', payload); // Kirim data keluar
            this.closeInput();
        }
    },
    mounted() {
        this.refreshLucideIcons();
    }
};
