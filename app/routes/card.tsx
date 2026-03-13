import { Button } from "~/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardSubtitle,
  CardTitle,
} from "~/components/ui/card";

const variants = ["elevated", "filled", "outlined"] as const;

export default function CardRoute() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4"></div>
      <div className="grid grid-cols-3 gap-4">
        {variants.map((variant) => (
          <Card variant={variant}>
            <CardHeader>
              <CardTitle>Title</CardTitle>
              <CardSubtitle>Subtitle</CardSubtitle>
              <CardAction>
                <Button variant="standard" size="icon-xs">
                  <MoreVertIcon />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="outlined">Secondary</Button>
              <Button>Primary</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {variants.map((variant) => (
          <Card variant={variant}>
            <CardHeader>
              <CardTitle>Title</CardTitle>
              <CardSubtitle>Subtitle</CardSubtitle>
              <CardAction>
                <Button variant="standard" size="xs">
                  More
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="outlined">Secondary</Button>
              <Button>Primary</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {variants.map((variant) => (
          <Card variant={variant}>
            <CardMedia variant="video" className="bg-purple-300" />
            <CardHeader>
              <CardTitle>Title</CardTitle>
              <CardSubtitle>Subtitle</CardSubtitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="outlined">Secondary</Button>
              <Button>Primary</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {variants.map((variant) => (
          <Card variant={variant}>
            <CardHeader>
              <CardTitle>Title</CardTitle>
              <CardSubtitle>Subtitle</CardSubtitle>
            </CardHeader>
            <CardContent>
              <CardMedia
                variant="video"
                className="rounded-[16px] bg-purple-300"
              />
              <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="outlined">Secondary</Button>
              <Button>Primary</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {variants.map((variant) => (
          <Card variant={variant} actionable>
            <CardHeader>
              <CardTitle>Title</CardTitle>
              <CardSubtitle>Subtitle</CardSubtitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {variants.map((variant) => (
          <Card variant={variant} actionable disabled>
            <CardHeader>
              <CardTitle>Title</CardTitle>
              <CardSubtitle>Subtitle</CardSubtitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {variants.map((variant) => (
          <Card variant={variant} actionable>
            <CardMedia variant="video" className="bg-purple-300" />
            <CardHeader>
              <CardTitle>Title</CardTitle>
              <CardSubtitle>Subtitle</CardSubtitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {variants.map((variant) => (
          <Card variant={variant} actionable disabled>
            <CardMedia
              variant="video"
              className="bg-purple-300 group-data-disabled/card:bg-on-surface/10"
            />
            <CardHeader>
              <CardTitle>Title</CardTitle>
              <CardSubtitle>Subtitle</CardSubtitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {variants.map((variant) => (
          <Card variant={variant} actionable>
            <CardHeader>
              <CardTitle>Title</CardTitle>
              <CardSubtitle>Subtitle</CardSubtitle>
            </CardHeader>
            <CardContent>
              <CardMedia
                variant="video"
                className="rounded-[16px] bg-purple-300"
              />
              <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {variants.map((variant) => (
          <Card variant={variant} actionable disabled>
            <CardHeader>
              <CardTitle>Title</CardTitle>
              <CardSubtitle>Subtitle</CardSubtitle>
            </CardHeader>
            <CardContent>
              <CardMedia
                variant="video"
                className="rounded-[16px] bg-purple-300"
              />
              <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function MoreVertIcon({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentcolor"
      {...props}
    >
      <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
    </svg>
  );
}
