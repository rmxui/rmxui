import { Radio, RadioGroup } from "~/components/ui/radio-group";

const apples = ["fuji", "gala", "granny"];

export default function RadioRoute() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-4"></div>
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col items-center">
            <RadioGroup>
              {apples.map((apple) => (
                <Radio key={apple} value={apple} />
              ))}
            </RadioGroup>
          </div>
          <div className="flex flex-col items-center">
            <RadioGroup disabled>
              {apples.map((apple) => (
                <Radio key={apple} value={apple} />
              ))}
            </RadioGroup>
          </div>
          <div className="flex flex-col items-center">
            <RadioGroup>
              {apples.map((apple) => (
                <label key={apple} id={apple} className="flex items-center">
                  <Radio key={apple} value={apple} />

                  <span className="first-letter:uppercase">{apple}</span>
                </label>
              ))}
            </RadioGroup>
          </div>
          <div className="flex flex-col items-center">
            <RadioGroup
              disabled
              className="data-disabled:*:[label]:text-on-surface/38"
            >
              {apples.map((apple) => (
                <label key={apple} id={apple} className="flex items-center">
                  <Radio key={apple} value={apple} />

                  <span className="first-letter:uppercase">{apple}</span>
                </label>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>
    </>
  );
}
