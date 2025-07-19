import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const FormControls = ({ formControls = [], formData, setFormData }) => {
  
  const renderComponentByType = (getControlItem) => {
    let element = null;
    const currentControlItemValue = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            value={currentControlItemValue}
            onChange={(event) => setFormData({
              ...formData,
              [getControlItem.name] : event.target.value,
            })}
          />
        );
        break;
      case "select":
        element = ( 
          <Select onValueChange={(value) => setFormData({
            ...formData,
            [getControlItem.name] : value
          })} value={currentControlItemValue}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            value={currentControlItemValue}
            onChange={(event) => setFormData({
              ...formData,
              [getControlItem.name] : event.target.value
            })}
          />
        );
        break;

      default:
        element = (
          <Input
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            value={currentControlItemValue}
            onChange={(event) => setFormData({
              ...formData,
              [getControlItem.name] : event.target.value,
            })}
          />
        );
        break;
    }
    return element;
  };

  return (
    <div className="flex flex-col gap-3">
      {formControls.map((controlsItem) => (
        <div key={controlsItem.name}>
          <Label htmlFor={controlsItem.name}>{controlsItem.label}</Label>
          {renderComponentByType(controlsItem)}
        </div>
      ))}
    </div>
  );
};

export default FormControls;
