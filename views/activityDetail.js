// root/view/activityDetail.js
import detailTemplate from './activityDetailView.js';
import { supabaseClient } from '../js/services/supabaseClient.js';

export default {
    name: 'ActivityDetailView',
    template: detailTemplate,
    setup() {
        const { ref, onMounted, nextTick } = Vue;
        const route = VueRouter.useRoute();
        
        const activity = ref(null);
        const loading = ref(true);

        const refreshLucide = () => nextTick(() => {
            if (window.lucide) window.lucide.createIcons();
        });

        // Ambil data detail aktivitas lari berdasarkan ID rute URL params
        const loadActivityDetail = async () => {
            loading.value = true;
            const activityId = route.params.id;
            
            try {
                const { data, error } = await supabaseClient
                    .from('run_activities')
                    .select('*')
                    .eq('id', activityId)
                    .single(); // Kita hanya butuh satu baris data tunggal matching ID

                if (error) throw error;
                activity.value = data;
            } catch (err) {
                console.error('Gagal mengambil detail run_activities:', err.message);
            } finally {
                loading.value = false;
                refreshLucide();
            }
        };

        const formatDate = (dateStr) => {
            if (!dateStr) return '...';
            return new Date(dateStr).toLocaleDateString('id-ID', { 
                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
            });
        };

        const getZonaColor = (kode) => {
            const colors = {
                'Z6': 'bg-red-600',
                'Z5': 'bg-orange-500',
                'Z4': 'bg-amber-500',
                'Z3': 'bg-emerald-500',
                'Z2': 'bg-blue-500',
                'Z1': 'bg-slate-400'
            };
            return colors[kode] || 'bg-slate-400';
        };

        onMounted(loadActivityDetail);

        return { 
            activity, loading, formatDate, getZonaColor
        };
    }
};
