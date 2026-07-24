import { useState, useEffect } from 'react';
import { ApiService } from '../services/apiService';
import { DashboardMetrics, LayananKinerja, ComplaintData } from '../domain/models';

export function useDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [layanan, setLayanan] = useState<LayananKinerja[]>([]);
  const [complaints, setComplaints] = useState<ComplaintData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [metricsData, layananData, complaintsData] = await Promise.all([
          ApiService.getDashboardMetrics(),
          ApiService.getLayananKinerja(),
          ApiService.getComplaintData(),
        ]);
        setMetrics(metricsData);
        setLayanan(layananData);
        setComplaints(complaintsData);
      } catch (err) {
        setError('Gagal memuat data dashboard');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { metrics, layanan, complaints, loading, error };
}
