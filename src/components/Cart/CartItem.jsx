import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CartItem({ item }) {
  return (
    <Card className="flex items-center gap-4 p-4 shadow-lg mx-5 my-3">
      {/* Product Image */}
      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-grow">
        <CardHeader className="p-0">
          <CardTitle className="text-lg font-semibold">{item.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-0 mt-1 text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad,
          similique! Animi quos sit optio libero voluptates harum nihil hic
          quaerat?
        </CardContent>
      </div>

      {/* Product Price */}
      <div className="text-right">
        <p className="text-lg font-bold text-primary">
          {capitalizeFirstLetter(item.size)}
        </p>
      </div>
    </Card>
  );
}
