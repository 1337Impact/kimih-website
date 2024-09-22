import ACancelAppointment from "@/actions/appointment-actions/cancel-Appointment";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { IoWarning } from "react-icons/io5";

function isMoreThan24Hours(date: Date): boolean {
  const currentDate = new Date();
  const diffInMilliseconds = date.getTime() - currentDate.getTime();
  const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
  
  return diffInHours > 24;
}

export function CancelAppointment({
  appointment_id,
  scheduled_date,
}: {
  appointment_id: string;
  scheduled_date: Date
}) {
  const { toast } = useToast();
  const router = useRouter();

  const handleCancelAppointment = async () => {
    const { error } = await ACancelAppointment(appointment_id);
    if (error) {
      toast({
        title: "Error",
        description: "Failed to cancel appointment",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Appointment has been canceled successfully",
        variant: "success",
      });
      router.refresh();
    }
  };

  if (!isMoreThan24Hours(scheduled_date)) {return null;}

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <span className="bg-red-500 text-white hover:bg-red-700 hover:text-white p-2 rounded-md">
          Cancel Appointment
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently cancel
            Appointment.
            <span className="flex gap-1 text-orange-400 mt-2">
              <span>
                <IoWarning size={34} />
              </span>
              <span>
                Warning: This will also cancel the payment associated with this
                appointment and all the appointments/memberships associated with
                it.
              </span>
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-700"
            onClick={handleCancelAppointment}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
