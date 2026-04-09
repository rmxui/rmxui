import { useState } from "react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "~/components/ui/input-group"

export default function InputGroupRoute() {
  const [variant, setVariant] = useState<any>("filled")
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex gap-1">
          <label htmlFor="variant">Variant:</label>
          <select
            id="variant"
            className="border outline-none"
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
          >
            <option value="outlined">Outlined</option>
            <option value="filled">Filled</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <InputGroup variant={variant}>
            <InputGroupInput placeholder="placeholder" />
          </InputGroup>
          <InputGroup variant={variant}>
            <InputGroupInput defaultValue="Input" />
          </InputGroup>
        </div>
        <div className="flex gap-4">
          <InputGroup variant={variant}>
            <InputGroupInput />
            <InputGroupAddon align="inline-end">
              <InputGroupButton>
                <CancelIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup variant={variant}>
            <InputGroupInput defaultValue="Input" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton>
                <CancelIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className="flex gap-4">
          <InputGroup variant={variant}>
            <InputGroupAddon align="inline-start">
              <InputGroupButton>
                <SearchIcon />
              </InputGroupButton>
            </InputGroupAddon>
            <InputGroupInput />
          </InputGroup>
          <InputGroup variant={variant}>
            <InputGroupAddon align="inline-start">
              <InputGroupButton>
                <SearchIcon />
              </InputGroupButton>
            </InputGroupAddon>
            <InputGroupInput defaultValue="Input" />
          </InputGroup>
        </div>
        <div className="flex gap-4">
          <InputGroup variant={variant}>
            <InputGroupAddon align="inline-start">
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput />
            <InputGroupAddon align="inline-end">
              <InputGroupButton>
                <CancelIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup variant={variant}>
            <InputGroupAddon align="inline-start">
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput defaultValue="Input" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton>
                <CancelIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className="flex gap-4">
          <InputGroup variant={variant}>
            <InputGroupAddon align="inline-start">
              <InputGroupText>$</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput />
          </InputGroup>
          <InputGroup variant={variant}>
            <InputGroupAddon align="inline-start">
              <InputGroupText>$</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput defaultValue="Input" />
          </InputGroup>
        </div>
        <div className="flex gap-4">
          <InputGroup variant={variant}>
            <InputGroupInput />
            <InputGroupAddon align="inline-end">
              <InputGroupText>lbs</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup variant={variant}>
            <InputGroupInput defaultValue="Input" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>lbs</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    </div>
  )
}

function SearchIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentcolor"
      {...props}
    >
      <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
    </svg>
  )
}

function CancelIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentcolor"
      {...props}
    >
      <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
    </svg>
  )
}
