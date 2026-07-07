// root/components/inputView.js

export default `
<div class="input-overlay fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] flex items-end justify-center overflow-y-auto p-4">
    <div class="input-container bg-white w-full max-w-3xl rounded-[40px] p-6 shadow-2xl my-auto max-h-[95vh] overflow-y-auto">
        
        <div class="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6"></div>

        <header class="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
            <h2 class="text-xl font-black text-slate-900 uppercase tracking-tight">🏃‍♂️ LAPORAN AKTIVITAS LARI</h2>
            <button @click="closeInput" class="text-slate-400 hover:text-slate-600 cursor-pointer">
                <i data-lucide="x" class="w-6 h-6"></i>
            </button>
        </header>

        <!-- FORM UTAMA -->
        <div class="space-y-6 text-left">
            
            <!-- 1. INFORMASI UMUM -->
            <div class="bg-slate-50 p-4 rounded-2xl space-y-3">
                <h3 class="text-xs font-black text-slate-400 uppercase tracking-wider">📋 Informasi Utama</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label class="text-[10px] font-bold text-slate-400 uppercase pl-1">Nama Aktivitas</label>
                        <input type="text" v-model="form.nama" placeholder="Contoh: Easy Run Sore" class="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-4 text-sm font-bold">
                    </div>
                    <div>
                        <label class="text-[10px] font-bold text-slate-400 uppercase pl-1">Jenis Latihan</label>
                        <input type="text" v-model="form.jenis_latihan" placeholder="Contoh: Interval / Recovery" class="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-4 text-sm font-bold">
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="text-[10px] font-bold text-slate-400 uppercase pl-1">Hari / Tanggal</label>
                        <input type="date" v-model="form.date" class="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-4 text-sm font-bold">
                    </div>
                    <div>
                        <label class="text-[10px] font-bold text-slate-400 uppercase pl-1">Waktu Mulai Latihan</label>
                        <input type="time" v-model="form.time" class="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-4 text-sm font-bold">
                    </div>
                </div>
            </div>

            <!-- 2. METRIK UTAMA -->
            <div class="bg-indigo-50/40 p-4 rounded-2xl space-y-3">
                <h3 class="text-xs font-black text-indigo-500 uppercase tracking-wider">📊 Ringkasan Metrik Utama</h3>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                        <label class="text-[10px] font-bold text-slate-400 uppercase pl-1">Jarak (KM)</label>
                        <input type="number" step="0.01" v-model="form.metrik_utama.jarak" placeholder="0.00" class="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm font-bold">
                    </div>
                    <div>
                        <label class="text-[10px] font-bold text-slate-400 uppercase pl-1">Pace Rata-rata</label>
                        <input type="text" v-model="form.metrik_utama.avg_pace" placeholder="05:30" class="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm font-bold">
                    </div>
                    <div>
                        <label class="text-[10px] font-bold text-slate-400 uppercase pl-1">RPE (1 - 10)</label>
                        <input type="number" v-model="form.metrik_utama.rpe" placeholder="5" class="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm font-bold">
                    </div>
                    <div>
                        <label class="text-[10px] font-bold text-slate-400 uppercase pl-1">Move Time</label>
                        <input type="text" v-model="form.metrik_utama.move_time" placeholder="45 m 20 s" class="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm font-bold">
                    </div>
                    <div>
                        <label class="text-[10px] font-bold text-slate-400 uppercase pl-1">Kenaikan Elevasi (m)</label>
                        <input type="number" v-model="form.metrik_utama.elevation_gain" placeholder="0" class="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm font-bold">
                    </div>
                    <div>
                        <label class="text-[10px] font-bold text-slate-400 uppercase pl-1">Split Tercepat</label>
                        <input type="text" v-model="form.metrik_utama.fastest_split" placeholder="04:50" class="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm font-bold">
                    </div>
                    <div>
                        <label class="text-[10px] font-bold text-slate-400 uppercase pl-1">Avg Cadence (SPM)</label>
                        <input type="number" v-model="form.metrik_utama.avg_cadence" placeholder="170" class="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm font-bold">
                    </div>
                    <div>
                        <label class="text-[10px] font-bold text-slate-400 uppercase pl-1">Post HR (BPM)</label>
                        <input type="number" v-model="form.metrik_utama.post_hr" placeholder="140" class="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm font-bold">
                    </div>
                </div>
                <div class="mt-2">
                    <label class="text-[10px] font-bold text-slate-400 uppercase pl-1">Catatan Efisiensi & Kondisi Umum</label>
                    <input type="text" v-model="form.metrik_utama.catatan_efisiensi" placeholder="Pace terjaga, nafas stabil sepanjang sesi..." class="w-full bg-white border border-slate-200 rounded-xl py-2 px-4 text-xs font-medium">
                </div>
            </div>

            <!-- 3. TABEL SPLIT PER KILOMETER -->
            <div class="bg-slate-50 p-4 rounded-2xl space-y-3">
                <div class="flex justify-between items-center">
                    <h3 class="text-xs font-black text-slate-400 uppercase tracking-wider">⏱️ 1. Split Per Kilometer</h3>
                    <button @click="addSplitRow" class="text-xs bg-indigo-600 text-white font-bold px-3 py-1 rounded-lg hover:bg-indigo-700 cursor-pointer">+ Tambah KM</button>
                </div>
                <div class="space-y-2 max-h-48 overflow-y-auto pr-1">
                    <div v-for="(split, index) in form.splits" :key="'split-'+index" class="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-100">
                        <span class="text-xs font-black text-slate-500 w-14 text-center">KM {{ split.km }}</span>
                        <input type="text" v-model="split.pace" placeholder="Pace (e.g. 05:40)" class="w-32 bg-slate-50 rounded-lg p-1.5 text-xs font-bold text-center">
                        <input type="text" v-model="split.catatan" placeholder="Catatan rute / kondisi" class="flex-1 bg-slate-50 rounded-lg p-1.5 text-xs font-medium">
                        <button @click="removeSplitRow(index)" class="text-red-500 hover:text-red-700 p-1 cursor-pointer">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- 4. TABEL LAP (PUTARAN) -->
            <div class="bg-slate-50 p-4 rounded-2xl space-y-3">
                <div class="flex justify-between items-center">
                    <h3 class="text-xs font-black text-slate-400 uppercase tracking-wider">🔄 2. Putaran (Laps)</h3>
                    <button @click="addLapRow" class="text-xs bg-indigo-600 text-white font-bold px-3 py-1 rounded-lg hover:bg-indigo-700 cursor-pointer">+ Tambah Lap</button>
                </div>
                <div class="space-y-2 max-h-48 overflow-y-auto pr-1">
                    <div v-for="(lap, index) in form.laps" :key="'lap-'+index" class="grid grid-cols-12 gap-1.5 bg-white p-2 rounded-xl border border-slate-100 items-center">
                        <span class="col-span-1 text-xs font-black text-slate-500 text-center">L{{ lap.lap }}</span>
                        <input type="number" step="0.01" v-model="lap.jarak" placeholder="Jarak" class="col-span-2 bg-slate-50 rounded-lg p-1 text-xs font-bold text-center">
                        <input type="text" v-model="lap.waktu" placeholder="Waktu" class="col-span-2 bg-slate-50 rounded-lg p-1 text-xs font-bold text-center">
                        <input type="text" v-model="lap.pace" placeholder="Pace" class="col-span-2 bg-slate-50 rounded-lg p-1 text-xs font-bold text-center">
                        <input type="number" v-model="lap.cadence" placeholder="Cad" class="col-span-2 bg-slate-50 rounded-lg p-1 text-xs font-bold text-center">
                        <input type="text" v-model="lap.stride" placeholder="Stride" class="col-span-2 bg-slate-50 rounded-lg p-1 text-xs font-bold text-center">
                        <button @click="removeLapRow(index)" class="col-span-1 text-red-500 hover:text-red-700 mx-auto cursor-pointer">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- 5. ANALISIS ZONA PACE -->
            <div class="bg-slate-50 p-4 rounded-2xl space-y-3">
                <h3 class="text-xs font-black text-slate-400 uppercase tracking-wider">⚡ Analisis Zona Pace / Intensitas Murni</h3>
                <div class="space-y-2">
                    <div v-for="zona in form.zona_pace" :key="zona.kode" class="grid grid-cols-12 gap-2 items-center bg-white p-2 rounded-xl border border-slate-100">
                        <div class="col-span-3 flex items-center gap-1.5">
                            <span class="text-xs font-black px-2 py-0.5 rounded-md text-white" :class="zona.warna">{{ zona.kode }}</span>
                            <span class="text-[10px] font-bold text-slate-500 uppercase">{{ zona.nama }}</span>
                        </div>
                        <span class="col-span-3 text-[10px] font-mono text-slate-400 text-center">{{ zona.rentang }}</span>
                        <div class="col-span-3 flex items-center gap-1">
                            <input type="number" v-model="zona.persentase" placeholder="0" class="w-full bg-slate-50 rounded-lg p-1 text-xs font-bold text-center">
                            <span class="text-xs text-slate-400">%</span>
                        </div>
                        <div class="col-span-3 flex items-center gap-1">
                            <input type="number" step="0.1" v-model="zona.durasi" placeholder="0" class="w-full bg-slate-50 rounded-lg p-1 text-xs font-bold text-center">
                            <span class="text-xs text-slate-400">min</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 6. CATATAN EVALUASI & PERASAAN -->
            <div class="bg-slate-50 p-4 rounded-2xl space-y-3">
                <h3 class="text-xs font-black text-slate-400 uppercase tracking-wider">📝 Catatan Evaluasi & Perasaan</h3>
                <div>
                    <label class="text-[10px] font-bold text-slate-400 uppercase pl-1">Kondisi fisik selama berlari</label>
                    <textarea placeholder="Bagaimana kondisi kaki, pernapasan, stamina..." v-model="form.evaluasi.fisik" class="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-medium h-16 resize-none mt-1"></textarea>
                </div>
                <div>
                    <label class="text-[10px] font-bold text-slate-400 uppercase pl-1">Kondisi cuaca dan rute</label>
                    <textarea placeholder="Suhu udara, arah angin, kondisi permukaan rute..." v-model="form.evaluasi.cuaca_rute" class="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-medium h-16 resize-none mt-1"></textarea>
                </div>
                <div>
                    <label class="text-[10px] font-bold text-slate-400 uppercase pl-1">Rencana perbaikan untuk sesi latihan berikutnya</label>
                    <textarea placeholder="Target koreksi postur, pengaturan hidrasi, pace adjustment..." v-model="form.evaluasi.rencana" class="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-medium h-16 resize-none mt-1"></textarea>
                </div>
            </div>

        </div>

        <button @click="saveTransaction" class="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-wide text-sm mt-6 hover:bg-slate-800 transition-all cursor-pointer shadow-xl active:scale-98">
            Simpan Sesi Lari
        </button>
    </div>
</div>
`;
