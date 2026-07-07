// root/components/inputView.js

export default `
<div class="input-overlay fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] flex items-end justify-center overflow-y-auto p-4">
    <div class="input-container bg-white w-full max-w-2xl rounded-t-[40px] rounded-b-[40px] p-6 shadow-2xl my-auto max-h-[90vh] overflow-y-auto">
        
        <div class="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6"></div>

        <header class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-black text-slate-900 uppercase tracking-tight">🏃‍♂️ Input Aktivitas Lari</h2>
            <button @click="closeInput" class="text-slate-400 hover:text-slate-600 cursor-pointer">
                <i data-lucide="x" class="w-6 h-6"></i>
            </button>
        </header>

        <div class="space-y-6 text-left">
            
            <div class="bg-slate-50 p-4 rounded-2xl space-y-3">
                <h3 class="text-xs font-black text-slate-400 uppercase tracking-wider">Informasi Sesi</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input type="text" v-model="form.nama" placeholder="Nama Aktivitas (e.g. Easy Run)" class="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold">
                    <input type="text" v-model="form.jenis_latihan" placeholder="Jenis Latihan (e.g. Recovery)" class="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold">
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <input type="date" v-model="form.date" class="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold">
                    <input type="time" v-model="form.time" class="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold">
                </div>
            </div>

            <div class="bg-indigo-50/50 p-4 rounded-2xl space-y-3">
                <h3 class="text-xs font-black text-indigo-400 uppercase tracking-wider">📊 Ringkasan Metrik Utama</h3>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                        <label class="text-[10px] font-bold text-slate-400 uppercase pl-1">Jarak (KM)</label>
                        <input type="number" step="0.01" v-model="form.metrik_utama.jarak" placeholder="0.00" class="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm font-bold">
                    </div>
                    <div>
                        <label class="text-[10px] font-bold text-slate-400 uppercase pl-1">Avg Pace (/KM)</label>
                        <input type="text" v-model="form.metrik_utama.avg_pace" placeholder="05:30" class="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm font-bold">
                    </div>
                    <div>
                        <label class="text-[10px] font-bold text-slate-400 uppercase pl-1">RPE (1-10)</label>
                        <input type="number" v-model="form.metrik_utama.rpe" placeholder="5" class="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm font-bold">
                    </div>
                    <div>
                        <label class="text-[10px] font-bold text-slate-400 uppercase pl-1">Move Time</label>
                        <input type="text" v-model="form.metrik_utama.move_time" placeholder="25:30" class="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm font-bold">
                    </div>
                    <div>
                        <label class="text-[10px] font-bold text-slate-400 uppercase pl-1">Elevasi (m)</label>
                        <input type="number" v-model="form.metrik_utama.elevation_gain" placeholder="12" class="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm font-bold">
                    </div>
                    <div>
                        <label class="text-[10px] font-bold text-slate-400 uppercase pl-1">Avg Cadence</label>
                        <input type="number" v-model="form.metrik_utama.avg_cadence" placeholder="170" class="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm font-bold">
                    </div>
                </div>
            </div>

            <div class="bg-slate-50 p-4 rounded-2xl space-y-3">
                <div class="flex justify-between items-center">
                    <h3 class="text-xs font-black text-slate-400 uppercase tracking-wider">⏱️ Splits per KM</h3>
                    <button @click="addSplitRow" class="text-xs bg-indigo-600 text-white font-bold px-3 py-1 rounded-lg hover:bg-indigo-700">+ Tambah KM</button>
                </div>
                <div class="max-h-40 overflow-y-auto space-y-2">
                    <div v-for="(split, index) in form.splits" :key="index" class="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-100">
                        <span class="text-xs font-black text-slate-500 w-12 text-center">KM {{ split.km }}</span>
                        <input type="text" v-model="split.pace" placeholder="Pace" class="w-24 bg-slate-50 rounded-lg p-1.5 text-xs font-bold text-center">
                        <input type="text" v-model="split.catatan" placeholder="Kondisi Rute / Catatan" class="flex-1 bg-slate-50 rounded-lg p-1.5 text-xs font-medium">
                        <button @click="removeSplitRow(index)" class="text-red-500 hover:text-red-700 p-1">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div class="bg-slate-50 p-4 rounded-2xl space-y-2">
                <h3 class="text-xs font-black text-slate-400 uppercase tracking-wider">📝 Catatan Evaluasi</h3>
                <textarea placeholder="Kondisi fisik selama berlari..." v-model="form.evaluasi.fisik" class="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-medium h-16 resize-none"></textarea>
                <textarea placeholder="Rencana perbaikan sesi berikutnya..." v-model="form.evaluasi.rencana" class="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-medium h-16 resize-none"></textarea>
            </div>

        </div>

        <button @click="saveTransaction" class="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-wide text-sm mt-6 hover:bg-slate-800 transition cursor-pointer">
            Simpan Sesi Lari
        </button>
    </div>
</div>
`;
