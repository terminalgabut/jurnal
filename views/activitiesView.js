// root/view/activitiesView.js

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
                        @click="goToDetail(act.id)"
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
</div>
`;
