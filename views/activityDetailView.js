// root/view/activityDetailView.js

export default `
<div class="activity-detail-wrapper animate-in pb-12">
    <header class="flex items-center gap-4 mb-8">
        <button @click="$router.back()" class="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
            <i data-lucide="arrow-left" class="w-5 h-5 text-slate-600"></i>
        </button>
        <div>
            <div class="flex items-center gap-2">
                <span class="text-xs font-black px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md uppercase tracking-tight">
                    {{ activity?.jenis_latihan || 'Run' }}
                </span>
                <span class="text-xs font-mono text-slate-400">• {{ formatDate(activity?.tanggal) }}</span>
            </div>
            <h1 class="text-2xl font-black text-slate-900 tracking-tight mt-0.5">{{ activity?.nama || 'Memuat...' }}</h1>
        </div>
    </header>

    <div v-if="loading" class="py-12 text-center text-sm font-bold text-slate-400 animate-pulse">
        Memuat detail aktivitas lari...
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div class="lg:col-span-8 space-y-6">
            
            <div class="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
                <h3 class="text-xs font-black text-slate-400 uppercase tracking-wider">📊 Ringkasan Metrik Utama</h3>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div class="bg-slate-50/60 p-3 rounded-2xl border border-slate-100">
                        <span class="text-[10px] font-bold text-slate-400 uppercase block">Jarak</span>
                        <span class="text-xl font-black text-slate-800 font-mono">{{ activity?.metrik_utama?.jarak || 0 }} <span class="text-xs">KM</span></span>
                    </div>
                    <div class="bg-indigo-50/40 p-3 rounded-2xl border border-indigo-50/50">
                        <span class="text-[10px] font-bold text-indigo-400 uppercase block">Avg Pace</span>
                        <span class="text-xl font-black text-indigo-600 font-mono">{{ activity?.metrik_utama?.avg_pace || '--:--' }}</span>
                    </div>
                    <div class="bg-slate-50/60 p-3 rounded-2xl border border-slate-100">
                        <span class="text-[10px] font-bold text-slate-400 uppercase block">RPE</span>
                        <span class="text-xl font-black text-slate-800">{{ activity?.metrik_utama?.rpe || 0 }}<span class="text-xs text-slate-400">/10</span></span>
                    </div>
                    <div class="bg-slate-50/60 p-3 rounded-2xl border border-slate-100">
                        <span class="text-[10px] font-bold text-slate-400 uppercase block">Move Time</span>
                        <span class="text-sm font-black text-slate-800 font-mono mt-1 block">{{ activity?.metrik_utama?.move_time || '-' }}</span>
                    </div>
                    <div class="bg-slate-50/60 p-3 rounded-2xl border border-slate-100">
                        <span class="text-[10px] font-bold text-slate-400 uppercase block">Kenaikan Elevasi</span>
                        <span class="text-xl font-black text-slate-800 font-mono">{{ activity?.metrik_utama?.elevation_gain || 0 }}<span class="text-xs">m</span></span>
                    </div>
                    <div class="bg-slate-50/60 p-3 rounded-2xl border border-slate-100">
                        <span class="text-[10px] font-bold text-slate-400 uppercase block">Split Tercepat</span>
                        <span class="text-xl font-black text-slate-800 font-mono">{{ activity?.metrik_utama?.fastest_split || '--:--' }}</span>
                    </div>
                    <div class="bg-slate-50/60 p-3 rounded-2xl border border-slate-100">
                        <span class="text-[10px] font-bold text-slate-400 uppercase block">Avg Cadence</span>
                        <span class="text-xl font-black text-slate-800 font-mono">{{ activity?.metrik_utama?.avg_cadence || 0 }} <span class="text-xs">SPM</span></span>
                    </div>
                    <div class="bg-slate-50/60 p-3 rounded-2xl border border-slate-100">
                        <span class="text-[10px] font-bold text-slate-400 uppercase block">Post HR</span>
                        <span class="text-xl font-black text-slate-800 font-mono">{{ activity?.metrik_utama?.post_hr || 0 }} <span class="text-xs">BPM</span></span>
                    </div>
                </div>
                <p v-if="activity?.metrik_utama?.catatan_efisiensi" class="text-xs bg-indigo-50/30 p-3 rounded-xl border border-indigo-50 text-slate-600 font-medium">
                    💡 <span class="font-bold text-indigo-600">Catatan Efisiensi:</span> {{ activity?.metrik_utama?.catatan_efisiensi }}
                </p>
            </div>

            <div class="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
                <h3 class="text-xs font-black text-slate-400 uppercase tracking-wider">🔄 2. Putaran (Laps)</h3>
                <div class="border border-slate-100 rounded-2xl overflow-hidden overflow-x-auto">
                    <table class="w-full text-left text-xs border-collapse bg-white">
                        <thead>
                            <tr class="bg-slate-50 text-slate-400 font-black uppercase border-b border-slate-100">
                                <th class="p-3 text-center">Lap</th>
                                <th class="p-3">Jarak</th>
                                <th class="p-3">Waktu</th>
                                <th class="p-3">Pace</th>
                                <th class="p-3">Cadence</th>
                                <th class="p-3">Stride Length</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 font-semibold text-slate-700">
                            <tr v-for="lp in activity?.laps" :key="lp.lap" class="hover:bg-slate-50/50">
                                <td class="p-3 text-center font-black text-slate-400 bg-slate-50/50">{{ lp.lap }}</td>
                                <td class="p-3 font-mono">{{ lp.jarak }} m</td>
                                <td class="p-3 font-mono">{{ lp.waktu }}</td>
                                <td class="p-3 font-mono text-indigo-600">{{ lp.pace }}</td>
                                <td class="p-3 font-mono">{{ lp.cadence }}</td>
                                <td class="p-3 font-mono">{{ lp.stride }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
                <h3 class="text-xs font-black text-slate-400 uppercase tracking-wider">⚡ Analisis Zona Pace / Intensitas Murni</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <div v-for="zn in activity?.zona_pace" :key="zn.kode" class="flex items-center justify-between bg-white p-3 rounded-xl text-xs shadow-sm">
                        <div class="flex items-center gap-2">
                            <span class="font-black px-2 py-0.5 rounded text-[10px] text-white" :class="getZonaColor(zn.kode)">{{ zn.kode }}</span>
                            <span class="font-bold text-slate-600">{{ zn.nama }}</span>
                        </div>
                        <span class="font-mono font-bold text-slate-800">
                            {{ zn.persentase }}% <span class="text-[10px] text-slate-400 font-medium">({{ zn.durasi }}m)</span>
                        </span>
                    </div>
                </div>
            </div>

        </div>

        <div class="lg:col-span-4 space-y-6">
            
            <div class="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
                <h3 class="text-xs font-black text-slate-400 uppercase tracking-wider">⏱️ 1. Per Kilometer (Split)</h3>
                <div class="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                    <div v-for="sp in activity?.splits" :key="sp.km" class="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl text-xs border border-slate-100">
                        <span class="font-black text-slate-500 w-12 text-center bg-white py-1 rounded-lg border border-slate-100">KM {{ sp.km }}</span>
                        <div class="flex flex-col flex-1">
                            <span class="font-mono font-black text-indigo-600">{{ sp.pace }} /KM</span>
                            <span class="text-slate-400 font-medium mt-0.5 text-[10px]">{{ sp.catatan || 'Tidak ada catatan rute' }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
                <h3 class="text-xs font-black text-slate-400 uppercase tracking-wider">📝 Catatan Evaluasi & Perasaan</h3>
                <div class="space-y-4 text-xs">
                    <div class="border-b border-slate-50 pb-2">
                        <span class="font-black text-slate-800 block mb-1">🧠 Kondisi Fisik selama Berlari:</span>
                        <p class="text-slate-500 font-medium leading-relaxed">{{ activity?.evaluasi?.fisik || '-' }}</p>
                    </div>
                    <div class="border-b border-slate-50 pb-2">
                        <span class="font-black text-slate-800 block mb-1">🌤️ Kondisi Cuaca & Rute:</span>
                        <p class="text-slate-500 font-medium leading-relaxed">{{ activity?.evaluasi?.cuaca_rute || '-' }}</p>
                    </div>
                    <div>
                        <span class="font-black text-slate-800 block mb-1">🎯 Rencana Perbaikan Berikutnya:</span>
                        <p class="text-slate-500 font-medium leading-relaxed">{{ activity?.evaluasi?.rencana || '-' }}</p>
                    </div>
                </div>
            </div>

        </div>

    </div>
</div>
`;
