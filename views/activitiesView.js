// root/views/activitiesView.js

export default `
<div class="activities-wrapper animate-in">
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
            <h1 class="text-3xl font-black text-slate-900 tracking-tight">Activities Log</h1>
            <p class="text-slate-500 text-sm mt-1">Review riwayat pelatihan murni Anda</p>
        </div>
        
        <div class="flex items-center gap-3">
            <div class="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                <p class="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none mb-1">Data Dimuat</p>
                <p class="text-sm font-bold text-blue-900 leading-none">{{ activities.length }} Sesi</p>
            </div>
            <button @click="loadActivities" 
                    class="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
                    :disabled="loading">
                <i data-lucide="refresh-cw" class="w-5 h-5 text-slate-600" :class="{'animate-spin': loading}"></i>
            </button>
        </div>
    </header>

    <div class="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
        <button v-for="type in ['All', 'Run', 'Sleep']" 
                :key="type"
                @click="filterType = type"
                :class="filterType === type ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'"
                class="px-6 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap">
            {{ type }}
        </button>
    </div>

    <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-slate-50/50 border-b border-slate-100">
                        <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Aktivitas</th>
                        <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Tipe</th>
                        <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Metrik Utama</th>
                        <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Tanggal</th>
                        <th class="px-6 py-4 w-10"></th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-50">
                    <tr v-for="act in filteredActivities" 
                        :key="act.id" 
                        @click="openDetailModal(act)"
                        class="group hover:bg-blue-50/30 cursor-pointer transition-all">
                        
                        <td class="px-6 py-4">
                            <p class="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{{ act.nama }}</p>
                            <p class="text-[10px] text-slate-400 mt-0.5 font-mono">ID: #{{ act.id }}</p>
                        </td>
                        
                        <td class="px-6 py-4 text-center">
                            <div :class="getTypeIconClass(act.jenis_latihan)" 
                                 class="w-10 h-10 rounded-2xl flex items-center justify-center mx-auto transition-all group-hover:scale-110 shadow-sm overflow-hidden">
                                <img :src="getIconName(act.jenis_latihan)" 
                                     :alt="act.jenis_latihan" 
                                     class="w-6 h-6 object-contain">
                            </div>
                        </td>

                        <td class="px-6 py-4 text-right">
                            <div v-if="act.jenis_latihan === 'Run' || act.jenis_latihan === 'run' || !act.jenis_latihan">
                                <span class="text-sm font-black text-slate-700">{{ act.metrik_utama?.jarak || 0 }}</span>
                                <span class="text-[10px] text-slate-400 ml-1">km</span>
                                <p class="text-[10px] text-slate-400 font-mono mt-0.5">{{ act.metrik_utama?.avg_pace || '00:00' }} /KM</p>
                            </div>
                            <div v-else>
                                <span class="text-sm font-black text-slate-700">-</span>
                            </div>
                        </td>

                        <td class="px-6 py-4 text-right text-sm text-slate-500 font-medium">
                            {{ formatDate(act.tanggal) }}
                        </td>

                        <td class="px-6 py-4 text-right">
                            <i data-lucide="chevron-right" class="w-4 h-4 text-slate-300 group-hover:text-indigo-400 transform group-hover:translate-x-1 transition-all"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="filteredActivities.length === 0 && !loading" class="py-20 text-center">
             <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <i data-lucide="search-x" class="w-8 h-8"></i>
            </div>
            <p class="text-slate-400 text-sm font-medium">Tidak ada aktivitas dengan tipe ini.</p>
        </div>

        <div v-if="loading" class="p-6 space-y-4">
            <div v-for="i in 3" :key="i" class="h-16 w-full bg-slate-50/50 rounded-2xl animate-pulse"></div>
        </div>
    </div>

    <div v-if="selectedActivity" class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[70] flex items-end justify-center p-4 overflow-y-auto">
        <div class="bg-white w-full max-w-2xl rounded-[40px] p-6 shadow-2xl my-auto max-h-[92vh] overflow-y-auto space-y-6 text-left">
            
            <div class="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-2"></div>

            <header class="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                    <span class="text-xs font-black text-indigo-500 uppercase tracking-widest">{{ selectedActivity.jenis_latihan }}</span>
                    <h2 class="text-xl font-black text-slate-900 uppercase tracking-tight">🏃‍♂️ {{ selectedActivity.nama }}</h2>
                    <p class="text-xs font-mono text-slate-400 mt-0.5">Sesi: {{ formatDate(selectedActivity.tanggal) }}</p>
                </div>
                <button @click="closeDetailModal" class="bg-slate-50 text-slate-400 hover:text-slate-600 p-2.5 rounded-full cursor-pointer transition">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </header>

            <div class="bg-indigo-50/40 p-4 rounded-3xl space-y-3">
                <h3 class="text-xs font-black text-indigo-600 uppercase tracking-wider">📊 Ringkasan Metrik Utama</h3>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div class="bg-white p-2 rounded-2xl border border-indigo-50">
                        <span class="text-[10px] font-bold text-slate-400 uppercase block">Jarak</span>
                        <span class="text-lg font-black text-slate-800 font-mono">{{ selectedActivity.metrik_utama?.jarak || 0 }} <span class="text-[10px]">KM</span></span>
                    </div>
                    <div class="bg-white p-2 rounded-2xl border border-indigo-50">
                        <span class="text-[10px] font-bold text-slate-400 uppercase block">Avg Pace</span>
                        <span class="text-lg font-black text-indigo-600 font-mono">{{ selectedActivity.metrik_utama?.avg_pace || '--:--' }}</span>
                    </div>
                    <div class="bg-white p-2 rounded-2xl border border-indigo-50">
                        <span class="text-[10px] font-bold text-slate-400 uppercase block">RPE</span>
                        <span class="text-lg font-black text-slate-800">{{ selectedActivity.metrik_utama?.rpe || 0 }}<span class="text-xs text-slate-400">/10</span></span>
                    </div>
                    <div class="bg-white p-2 rounded-2xl border border-indigo-50">
                        <span class="text-[10px] font-bold text-slate-400 uppercase block">Move Time</span>
                        <span class="text-sm font-black text-slate-800 font-mono mt-1 block">{{ selectedActivity.metrik_utama?.move_time || '-' }}</span>
                    </div>
                </div>
            </div>

            <div class="space-y-2" v-if="selectedActivity.splits && selectedActivity.splits.length > 0">
                <h4 class="text-xs font-black text-slate-400 uppercase tracking-wider">⏱️ 1. Per Kilometer (Split)</h4>
                <div class="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50 p-1.5 space-y-1">
                    <div v-for="sp in selectedActivity.splits" :key="sp.km" class="flex items-center gap-3 bg-white p-2 rounded-xl text-xs">
                        <span class="font-black text-slate-500 w-12 text-center bg-slate-50 py-1 rounded-lg">KM {{ sp.km }}</span>
                        <span class="font-mono font-bold text-indigo-600 w-16">{{ sp.pace }} /KM</span>
                        <span class="text-slate-500 flex-1 font-medium">{{ sp.catatan || '-' }}</span>
                    </div>
                </div>
            </div>

            <div class="bg-slate-50 p-4 rounded-3xl space-y-3">
                <h4 class="text-xs font-black text-slate-400 uppercase tracking-wider">📝 Catatan Evaluasi & Perasaan</h4>
                <div class="space-y-2 text-xs">
                    <p class="text-slate-600 font-medium"><span class="font-black text-slate-800 block mb-0.5">🧠 Kondisi Fisik:</span> {{ selectedActivity.evaluasi?.fisik || '-' }}</p>
                    <p class="text-slate-600 font-medium"><span class="font-black text-slate-800 block mb-0.5">🌤️ Cuaca & Rute:</span> {{ selectedActivity.evaluasi?.cuaca_rute || '-' }}</p>
                </div>
            </div>
        </div>
    </div>
</div>
`;
