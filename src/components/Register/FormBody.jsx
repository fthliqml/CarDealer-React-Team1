import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const FormBody = ({ children }) => {
  return (
    <CardContent>
      <div className="grid w-full items-center gap-4">
        {children}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="interest">Interest</Label>
          <Select className={"rounded-xl"}>
            <SelectTrigger id="interest">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="newCar">New Car</SelectItem>
              <SelectItem value="secondCar">Second Car</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </CardContent>
  );
};

export default FormBody;
