import { Zap } from 'lucide-react';

export default function LeadScoreLegend() {
  return (
    <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-xl mb-6">
      <div className="flex items-center gap-2">
        <Zap size={18} className="text-gray-600" />
        <span className="text-sm font-medium text-gray-600">Lead Score:</span>
      </div>

      <div className="flex items-center gap-2" title="Score above 70 - High priority">
        <span className="w-3 h-3 rounded-full bg-red-600" />
        <span className="text-sm text-gray-600">Hot (70+)</span>
      </div>

      <div className="flex items-center gap-2" title="Score between 40-70 - Medium priority">
        <span className="w-3 h-3 rounded-full bg-orange-600" />
        <span className="text-sm text-gray-600">Warm (40-70)</span>
      </div>

      <div className="flex items-center gap-2" title="Score below 40 - Standard priority">
        <span className="w-3 h-3 rounded-full bg-gray-400" />
        <span className="text-sm text-gray-600">Standard (&lt;40)</span>
      </div>
    </div>
  );
}
