// root/components/inputModal.js
import inputView from './inputView.js';

export default {
    name: 'InputModal',
    template: inputView,
    emits: ['close-input', 'refresh-data'], // Menambahkan emit refresh data setelah simpan sukses
    data() {
        // Ambil waktu lokal saat ini untuk isian awal form yang ramah pengguna
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
                    avg_cadence: ''
                },
                splits: [
                    { km: 1, pace: '', catatan: '' } // Sesi awal diberi 1 baris default
                ],
                evaluasi: {
                    fisik: '',
                    rencana: ''
                }
            }
        }
    },
    methods: {
        closeInput() {
            this.$emit('close-input');
        },
        addSplitRow() {
            const nextKM = this.form.splits.length + 1;
            this.form.splits.push({ km: nextKM, pace: '', catatan: '' });
            this.$nextTick(() => { if(window.lucide) window.lucide.createIcons(); });
        },
        removeSplitRow(index) {
            this.form.splits.splice(index, 1);
            // Susun ulang nomor KM agar tetap urut berurutan
            this.form.splits.forEach((split, idx) => {
                split.km = idx + 1;
            });
        },
        async saveTransaction() {
            // Gabungkan format input waktu lokal (date & time) menjadi satu format ISO terstandar untuk DB Supabase
            const gabungWaktuISO = new Date(`${this.form.date}T${this.form.time}:00`).toISOString();

            // Susun objek data yang bersih dan siap di-insert ke kolom JSONB Supabase Anda
            const payload = {
                nama: this.form.nama || 'Easy Run',
                tanggal: this.form.date, // Untuk index pencarian tanggal cepat
                waktu_sesi: gabungWaktuISO, // Timestamp terstandar ISO
                jenis_latihan: this.form.jenis_latihan,
                metrik_utama: this.form.metrik_utama,
                splits: this.form.splits,
                evaluasi: this.form.evaluasi
            };

            console.log('Payload siap kirim ke Supabase:', payload);
            
            // Disini Anda tinggal memanggil fungsi `supabaseClient.from().insert([payload])`
            // setelah sukses, lakukan:
            // this.$emit('refresh-data');
            
            this.closeInput();
        }
    },
    mounted() {
        if (window.lucide) window.lucide.createIcons();
    }
};
