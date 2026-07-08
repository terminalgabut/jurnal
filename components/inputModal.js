// root/components/inputModal.js
import inputView from './inputView.js';
import { inputService } from '../js/services/inputService.js';

export default {
    name: 'InputModal',
    template: inputView,
    emits: ['close-input', 'refresh-data'],
    data() {
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
                    { km: 1, pace: '', catatan: '' }
                ],
                laps: [
                    { lap: 1, jarak: '', waktu: '', pace: '', cadence: '', stride: '' }
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
        };
    },
    methods: {
        closeInput() {
            // Memancarkan event langsung ke layout.js untuk menutup modal secara alami
            this.$emit('close-input');
        },
        addSplitRow() {
            const nextKM = this.form.splits.length + 1;
            this.form.splits.push({ km: nextKM, pace: '', catatan: '' });
            this.refreshLucideIcons();
        },
        removeSplitRow(index) {
            this.form.splits.splice(index, 1);
            this.form.splits.forEach((split, idx) => { split.km = idx + 1; });
        },
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
        async saveTransaction() {
            try {
                // Jembatan langsung menggunakan inputService tanpa logika query di sini
                await inputService.saveRunActivity(this.form);

                alert('Laporan aktivitas lari berhasil disimpan ke database!');
                
                // Memicu refresh data pada dashboard utama dan menutup form modal
                this.$emit('refresh-data');
                this.closeInput();
            } catch (err) {
                alert('Gagal menyimpan data: ' + err.message);
                console.error(err);
            }
        }
    },
    mounted() {
        this.refreshLucideIcons();
    }
};
