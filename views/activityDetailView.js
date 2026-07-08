// root/view/activityDetailView.js

export default `
<div class="activity-detail-wrapper animate-in pb-12">
    <header class="flex items-center gap-4 mb-8">
        <button @click="$router.back()" class="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
            <i data-lucide="arrow-left" class="w-5 h-5 text-slate-600"></i>
        </button>
        <div>
            <div class="flex items-center gap-2">
                <span class="text-xs font-black px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md uppercase tracking-tight">
                    {{ activity?.jenis_latihan || 'Run' }}
                </span>
                <span class="text-xs font-mono text-slate-400">• {{ formatDate(activity?.tanggal) }}</span>
            </div>
            <h1 class="text-2xl font-black text-slate-900 tracking-tight mt-0.5">{{ activity?.nama || 'Loading...' }}</h1>
        </div>
    </header>

    <div v-if="loading" class="py-12 text-center text-sm font-bold text-slate-400 animate-pulse">
        Memuat detail aktivitas...
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div class="lg:col-span-8 space-y-6">
            
            <div class="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
                <div class="flex items-center gap-2 border-b border-slate-50 pb-2">
                    <i data-lucide="bar-chart-3" class="w-4 h-4 text-blue-600"></i>
                    <h3 class="text-xs font-black text-slate-400 uppercase tracking-wider">Ringkasan Metrik Utama</h3>
                </div>
                
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div class="bg-slate-50/60 p-3 rounded-2xl border border-slate-100 flex flex-col justify-center items-center">
                        <i data-lucide="footprints" class="w-4 h-4 text-slate-400 mb-1"></i>
                        <span class="text-[10px] font-bold text-slate-400 uppercase block">Jarak</span>
                        <span class="text-xl font-black text-slate-800 font-mono">{{ activity?.metrik_utama?.jarak || 0 }} <span class="text-xs">KM</span></span>
                    </div>
                    <div class="bg-blue-50/40 p-3 rounded-2xl border border-blue-50/50 flex flex-col justify-center items-center">
                        <i data-lucide="gauge" class="w-4 h-4 text-blue-500 mb-1"></i>
                        <span class="text-[10px] font-bold text-blue-400 uppercase block">Avg Pace</span>
                        <span class="text-xl font-black text-blue-600 font-mono">{{ activity?.metrik_utama?.avg_pace || '--:--' }}</span>
                    </div>
                    <div class="bg-slate-50/60 p-3 rounded-2xl border border-slate-100 flex flex-col justify-center items-center">
                        <i data-lucide="activity" class="w-4 h-4 text-slate-400 mb-1"></i>
                        <span class="text-[10px] font-bold text-slate-400 uppercase block">RPE</span>
                        <span class="text-xl font-black text-slate-800">{{ activity?.metrik_utama?.rpe || 0 }}<span class="text-xs text-slate-400">/10</span></span>
                    </div>
                    <div class="bg-slate-50/60 p-3 rounded-2xl border border-slate-100 flex flex-col justify-center items-center">
                        <i data-lucide="timer" class="w-4 h-4 text-slate-400 mb-1"></i>
                        <span class="text-[10px] font-bold text-slate-400 uppercase block">Waktu Sesi</span>
                        <span class="text-sm font-black text-slate-800 font-mono mt-0.5 block">{{ activity?.metrik_utama?.move_time || '-' }}</span>
                    </div>
                    <div class="bg-slate-50/60 p-3 rounded-2xl border border-slate-100 flex flex-col justify-center items-center">
                        <i data-lucide="trending-up" class="w-4 h-4 text-slate-400 mb-1"></i>
                        <span class="text-[10px] font-bold text-slate-400 uppercase block">Elevasi</span>
                        <span class="text-xl font-black text-slate-800 font-mono">{{ activity?.metrik_utama?.elevation_gain || 0 }}<span class="text-xs">m</span></span>
                    </div>
                    <div class="bg-slate-50/60 p-3 rounded-2xl border border-slate-100 flex flex-col justify-center items-center">
                        <i data-lucide="zap" class="w-4 h-4 text-slate-400 mb-1"></i>
                        <span class="text-[10px] font-bold text-slate-400 uppercase block">Best Split</span>
                        <span class="text-xl font-black text-slate-800 font-mono">{{ activity?.metrik_utama?.fastest_split || '--:--' }}</span>
                    </div>
                    <div class="bg-slate-50/60 p-3 rounded-2xl border border-slate-100 flex flex-col justify-center items-center">
                        <i data-lucide="infinity" class="w-4 h-4 text-slate-400 mb-1"></i>
                        <span class="text-[10px] font-bold text-slate-400 uppercase block">Cadence</span>
                        <span class="text-xl font-black text-slate-800 font-mono">{{ activity?.metrik_utama?.avg_cadence || 0 }} <span class="text-xs">SPM</span></span>
                    </div>
                    <div class="bg-slate-50/60 p-3 rounded-2xl border border-slate-100 flex flex-col justify-center items-center">
                        <i data-lucide="heart-pulse" class="w-4 h-4 text-slate-400 mb-1"></i>
                        <span class="text-[10px] font-bold text-slate-400 uppercase block">Post HR</span>
                        <span class="text-xl font-black text-slate-800 font-mono">{{ activity?.metrik_utama?.post_hr || 0 }} <span class="text-xs">BPM</span></span>
                    </div>
                </div>
                
                <p v-if="activity?.metrik_utama?.catatan_efisiensi" class="text-xs bg-blue-50/30 p-3 rounded-xl border border-blue-50 text-slate-600 font-medium flex items-start gap-2">
                    <i data-lucide="lightbulb" class="w-4 h-4 text-blue-500 shrink-0 mt-0.5"></i>
                    <span><span class="font-bold text-blue-600">Analisis Efisiensi:</span> {{ activity?.metrik_utama?.catatan_efisiensi }}</span>
                </p>
            </div>

            <div class="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
                <div class="flex items-center gap-2 border-b border-slate-50 pb-2">
                    <i data-lucide="refresh-cw" class="w-4 h-4 text-blue-600"></i>
                    <h3 class="text-xs font-black text-slate-400 uppercase tracking-wider">Putaran (Laps)</h3>
                </div>
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
                                <td class="p-3 font-mono text-blue-600">{{ lp.pace }}</td>
                                <td class="p-3 font-mono">{{ lp.cadence }}</td>
                                <td class="p-3 font-mono">{{ lp.stride }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
                <div class="flex items-center gap-2 border-b border-slate-50 pb-2">
                    <i data-lucide="flame" class="w-4 h-4 text-blue-600"></i>
                    <h3 class="text-xs font-black text-slate-400 uppercase tracking-wider">Analisis Zona Pace / Intensitas Murni</h3>
                </div>
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
                <div class="flex items-center gap-2 border-b border-slate-50 pb-2">
                    <i data-lucide="navigation-2" class="w-4 h-4 text-blue-600"></i>
                    <h3 class="text-xs font-black text-slate-400 uppercase tracking-wider">Per Kilometer (Split)</h3>
                </div>
                <div class="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                    <div v-for="sp in activity?.splits" :key="sp.km" class="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl text-xs border border-slate-100">
                        <span class="font-black text-slate-500 w-12 text-center bg-white py-1 rounded-lg border border-slate-100">KM {{ sp.km }}</span>
                        <div class="flex flex-col flex-1">
                            <span class="font-mono font-black text-blue-600">{{ sp.pace }} /KM</span>
                            <span class="text-slate-400 font-medium mt-0.5 text-[10px]">{{ sp.catatan || 'Tidak ada catatan rute' }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
                <div class="flex items-center gap-2 border-b border-slate-50 pb-2">
                    <i data-lucide="clipboard-list" class="w-4 h-4 text-blue-600"></i>
                    <h3 class="text-xs font-black text-slate-400 uppercase tracking-wider">Evaluasi & Perasaan</h3>
                </div>
                <div class="space-y-4 text-xs">
                    <div class="border-b border-slate-50 pb-2 flex gap-2">
                        <i data-lucide="brain" class="w-4 h-4 text-slate-400 shrink-0 mt-0.5"></i>
                        <div>
                            <span class="font-black text-slate-800 block mb-1">Kondisi Fisik:</span>
                            <p class="text-slate-500 font-medium leading-relaxed">{{ activity?.evaluasi?.fisik || '-' }}</p>
                        </div>
                    </div>
                    <div class="border-b border-slate-50 pb-2 flex gap-2">
                        <i data-lucide="cloud-sun" class="w-4 h-4 text-slate-400 shrink-0 mt-0.5"></i>
                        <div>
                            <span class="font-black text-slate-800 block mb-1">Cuaca & Rute:</span>
                            <p class="text-slate-500 font-medium leading-relaxed">{{ activity?.evaluasi?.cuaca_rute || '-' }}</p>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <i data-lucide="target" class="w-4 h-4 text-slate-400 shrink-0 mt-0.5"></i>
                        <div>
                            <span class="font-black text-slate-800 block mb-1">Rencana Perbaikan:</span>
                            <p class="text-slate-500 font-medium leading-relaxed">{{ activity?.evaluasi?.rencana || '-' }}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</div>
`;
