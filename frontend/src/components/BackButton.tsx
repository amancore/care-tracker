
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      onClick={() => navigate(-1)}
      className="mb-6 hover:bg-gray-100 transition-colors"
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Back
    </Button>
  );
}
