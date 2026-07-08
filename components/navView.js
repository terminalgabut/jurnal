// NavView.js
export default {
  name: 'NavView',
  template: `
    <nav class="app-navigation fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-100 z-50">
        <div class="nav-menu-wrapper flex justify-around items-center h-20 max-w-md mx-auto px-2">
            
            <router-link to="/" class="nav-item flex flex-col items-center gap-1 group flex-1">
                <div class="p-2 rounded-xl group-[.router-link-active]:bg-indigo-50 group-[.router-link-active]:text-indigo-600 text-slate-400 transition-all">
                    <i data-lucide="layout-grid" class="w-5 h-5"></i>
                </div>
                <span class="nav-label text-[8px] font-black uppercase tracking-tighter group-[.router-link-active]:text-indigo-600 text-slate-400">Home</span>
            </router-link>

            <router-link to="/history class="nav-item flex flex-col items-center gap-1 group flex-1">
                <div class="p-2 rounded-xl group-[.router-link-active]:bg-indigo-50 group-[.router-link-active]:text-indigo-600 text-slate-400 transition-all">
                    <i data-lucide="history" class="w-5 h-5"></i>
                </div>
                <span class="nav-label text-[8px] font-black uppercase tracking-tighter group-[.router-link-active]:text-indigo-600 text-slate-400">Aktivitas</span>
            </router-link>

            <button @click="$emit('open-input')" class="nav-item flex flex-col items-center gap-1 flex-1 outline-none group">
                <div class="p-3 -mt-10 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-90 border-4 border-white">
                    <i data-lucide="plus" class="w-6 h-6"></i>
                </div>
                <span class="nav-label text-[8px] font-black uppercase tracking-tighter text-slate-400 mt-1">Input</span>
            </button>

            <router-link to="/analysis" class="nav-item flex flex-col items-center gap-1 group flex-1">
                <div class="p-2 rounded-xl group-[.router-link-active]:bg-indigo-50 group-[.router-link-active]:text-indigo-600 text-slate-400 transition-all">
                    <i data-lucide="pie-chart" class="w-5 h-5"></i>
                </div>
                <span class="nav-label text-[8px] font-black uppercase tracking-tighter group-[.router-link-active]:text-indigo-600 text-slate-400">Analisis</span>
            </router-link>

            <router-link to="/goals" class="nav-item flex flex-col items-center gap-1 group flex-1">
                <div class="p-2 rounded-xl group-[.router-link-active]:bg-indigo-50 group-[.router-link-active]:text-indigo-600 text-slate-400 transition-all">
                    <i data-lucide="target" class="w-5 h-5"></i>
                </div>
                <span class="nav-label text-[8px] font-black uppercase tracking-tighter group-[.router-link-active]:text-indigo-600 text-slate-400">Target</span>
            </router-link>

        </div>
    </nav>
  `
};
