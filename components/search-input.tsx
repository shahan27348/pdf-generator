// "use client";
// import React, { ChangeEventHandler, useEffect, useState } from "react";
// import { Search } from "lucide-react";
// import { Input } from "./ui/input";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useDebounce } from "@/hooks/use-debounce";
// import qs from "query-string";

// const SearchInput = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const categoryId = searchParams.get("categoryId");
//   const name = searchParams.get("name");

//   const [value, setValue] = useState(name || "");
//   const debouncedValue = useDebounce<string>(value, 500);

//   const onchange: ChangeEventHandler<HTMLInputElement> = (e) => {
//     setValue(e.target.value);
//   };

//   useEffect(() => {
//     const query = {
//       name: debouncedValue,
//       categoryId: categoryId,
//     };
//     const url = qs.stringifyUrl(
//       {
//         url: window.location.href,
//         query,
//       },
//       {
//         skipEmptyString: true,
//         skipNull: true,
//       }
//     );
//     router.push(url);
//   }, [debouncedValue, router, categoryId]);

//   return (
//     <div className="relative">
//       <Search className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />
//       <Input onChange={onchange} value={value}placeholder="Search..." className="pl-10 bg-primary/10" />
//     </div>
//   );
// };

// export default SearchInput;
