'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Server, CheckCircle, AlertTriangle, XCircle, Wrench, Activity, Globe } from 'lucide-react';
import { services, type Service } from '@/lib/data';

export function ServiceGrid() {
  const [serviceList, setServiceList] = useState(services);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    // Simulate service status updates
    const interval = setInterval(() => {
      setServiceList((prev) =>
        prev.map((service) => ({
          ...service,
          latency: Math.max(1, service.latency + Math.floor((Math.random() - 0.5) * 10)),
          lastCheck: new Date(),
        }))
      );
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const onlineCount = serviceList.filter((s) => s.status === 'online').length;
  const totalCount = serviceList.length;

  return (
    <div className="h-full flex flex-col bg-void-light/30 rounded-lg border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-spinoza-yellow" />
          <span className="text-sm font-medium text-white">Services</span>
          <span className="text-[10px] text-neutral-500">({onlineCount}/{totalCount} online)</span>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="w-3 h-3 text-green-400 animate-pulse" />
          <span className="text-[9px] text-neutral-500">
            Updated {lastUpdate.toLocaleTimeString('en-US', { hour12: false })}
          </span>
        </div>
      </div>

      {/* Services list */}
      <div className="flex-1 overflow-auto p-2 space-y-1.5">
        {serviceList.map((service, index) => (
          <ServiceRow key={service.id} service={service} index={index} />
        ))}
      </div>
    </div>
  );
}

function ServiceRow({ service, index }: { service: Service; index: number }) {
  const statusConfig = {
    online: { icon: <CheckCircle className="w-3.5 h-3.5" />, color: 'text-green-400', bg: 'bg-green-500/10' },
    offline: { icon: <XCircle className="w-3.5 h-3.5" />, color: 'text-red-400', bg: 'bg-red-500/10' },
    degraded: { icon: <AlertTriangle className="w-3.5 h-3.5" />, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    maintenance: { icon: <Wrench className="w-3.5 h-3.5" />, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  };

  const config = statusConfig[service.status];

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      className={`flex items-center gap-3 p-2 rounded-lg ${config.bg} border border-white/5 hover:border-white/10 transition-colors cursor-pointer group`}
    >
      {/* Status icon */}
      <span className={config.color}>{config.icon}</span>

      {/* Service info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-white truncate">{service.name}</span>
          <span className={`text-[8px] uppercase ${config.color}`}>{service.status}</span>
        </div>
        <div className="flex items-center gap-3 text-[9px] text-neutral-500 mt-0.5">
          <span className="flex items-center gap-1">
            <Globe className="w-2.5 h-2.5" />
            {service.region}
          </span>
          <span>
            Instances: <span className={service.healthyInstances < service.instances ? 'text-yellow-400' : 'text-green-400'}>
              {service.healthyInstances}/{service.instances}
            </span>
          </span>
        </div>
      </div>

      {/* Latency & Uptime */}
      <div className="text-right">
        <div className={`text-xs tabular-nums ${
          service.latency > 100 ? 'text-yellow-400' : service.latency > 50 ? 'text-neutral-300' : 'text-green-400'
        }`}>
          {service.status === 'maintenance' ? '—' : `${service.latency}ms`}
        </div>
        <div className="text-[9px] text-neutral-500">{service.uptime}</div>
      </div>
    </motion.div>
  );
}
