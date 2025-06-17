import { Loader } from '@/components/ui/loader';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <Loader variant="wave" size="lg" />
      </div>
    </div>
  );
}
