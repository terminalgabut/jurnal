// root/components/activities.js
import activitiesTemplate from './activitiesView.js';
import { supabaseClient } from '../js/services/supabaseClient.js'; // Menggunakan client yang sudah diekspor

export default {
    name: 'ActivitiesView',
    template: activitiesTemplate,
    setup() {
        const { ref, onMounted, nextTick, computed, watch } = Vue;
        
        const activities = ref([]);
        const loading = ref(true);
        const filterType = ref('All');
        const selectedActivity = ref(null); // State reaktif untuk melacak baris mana yang sedang dibuka detailnya

        // Logika Penyaringan Data Sederhana (All, Run, Sleep)
        const filteredActivities = computed(() => {
            if (filterType.value === 'All') return activities.value;
            return activities.value.filter(act => {
                const typeNormal = (act.jenis_latihan || '').toLowerCase();
                const filterNormal = filterType.value.toLowerCase();
                return typeNormal === filterNormal;
            });
        });

        // Pantau filter untuk merender ulang ikon Lucide jika diperlukan
        watch(filterType, () => {
            nextTick(() => {
                if (window.lucide) window.lucide.createIcons();
            });
        });

        // Menarik data dari tabel baru: run_activities
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

        // Selector jalur ikon PNG dinamis
        const getIconName = (type) => {
            const normalType = (type || '').toLowerCase();
            if (normalType === 'run') return 'icon/run.png';
            if (normalType === 'sleep') return 'icon/sleep.png'; // Jalur untuk update sleep mendatang
            return 'icon/default.png';
        };

        const getTypeIconClass = (type) => {
            const normalType = (type || '').toLowerCase();
            if (normalType === 'run') return 'bg-emerald-500/10 ring-1 ring-emerald-500/20';
            if (normalType === 'sleep') return 'bg-indigo-500/10 ring-1 ring-indigo-500/20';
            return 'bg-slate-500/10 ring-1 ring-slate-500/20';
        };

        // Fungsi kontrol interaksi modal pop-up detail murni tanpa ganti halaman router
        const openDetailModal = (activity) => {
            selectedActivity.value = activity;
            nextTick(() => {
                if (window.lucide) window.lucide.createIcons();
            });
        };

        const closeDetailModal = () => {
            selectedActivity.value = null;
        };
        
        const formatDate = (dateStr) => {
            if (!dateStr) return '-';
            return new Date(dateStr).toLocaleDateString('id-ID', {
                day: 'numeric', month: 'short', year: 'numeric'
            });
        };

        onMounted(loadActivities);

        return { 
            activities, filteredActivities, loading, filterType, selectedActivity,
            loadActivities, openDetailModal, closeDetailModal, formatDate, 
            getIconName, getTypeIconClass
        };
    }
};
