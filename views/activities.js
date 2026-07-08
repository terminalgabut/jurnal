// root/view/activities.js
import activitiesTemplate from './activitiesView.js';
import { supabaseClient } from '../js/services/supabaseClient.js';

export default {
    name: 'ActivitiesView',
    template: activitiesTemplate,
    setup() {
        const { ref, onMounted, nextTick, computed, watch } = Vue;
        const router = VueRouter.useRouter(); // AKTIFKAN ROUTER KEMBALI
        
        const activities = ref([]);
        const loading = ref(true);
        const filterType = ref('All');

        // Logika Penyaringan Data Sederhana (All, Run, Sleep)
        const filteredActivities = computed(() => {
            if (filterType.value === 'All') return activities.value;
            return activities.value.filter(act => {
                const typeNormal = (act.jenis_latihan || '').toLowerCase();
                const filterNormal = filterType.value.toLowerCase();
                return typeNormal === filterNormal;
            });
        });

        watch(filterType, () => {
            nextTick(() => {
                if (window.lucide) window.lucide.createIcons();
            });
        });

        const loadActivities = async () => {
            loading.value = true;
            try {
                const { data, error } = await supabaseClient
                    .from('run_activities')
                    .select('*')
                    .order('tanggal', { ascending: false });

                if (error) throw error;
                activities.value = data || [];
            } catch (err) {
                console.error('Gagal mengambil data run_activities:', err);
            } finally {
                loading.value = false;
                nextTick(() => {
                    if (window.lucide) window.lucide.createIcons();
                });
            }
        };

        // NAVIGASI ROUTER KE HALAMAN DETAIL PENUH
        const goToDetail = (id) => {
            router.push({ 
                name: 'activity-detail', 
                params: { id: id } 
            });
        };

        const getIconName = (type) => {
            const normalType = (type || '').toLowerCase();
            if (normalType === 'run') return 'icon/run.png';
            if (normalType === 'sleep') return 'icon/sleep.png';
            return 'icon/default.png';
        };

        const getTypeIconClass = (type) => {
            const normalType = (type || '').toLowerCase();
            if (normalType === 'run') return 'bg-emerald-500/10 ring-1 ring-emerald-500/20';
            if (normalType === 'sleep') return 'bg-indigo-500/10 ring-1 ring-indigo-500/20';
            return 'bg-slate-500/10 ring-1 ring-slate-500/20';
        };
        
        const formatDate = (dateStr) => {
            if (!dateStr) return '-';
            return new Date(dateStr).toLocaleDateString('id-ID', {
                day: 'numeric', month: 'short', year: 'numeric'
            });
        };

        onMounted(loadActivities);

        return { 
            activities, filteredActivities, loading, filterType,
            loadActivities, goToDetail, formatDate, 
            getIconName, getTypeIconClass
        };
    }
};
