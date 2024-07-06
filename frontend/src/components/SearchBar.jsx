import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { UserSearchIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import client from "./axiosClient";

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [patients, setPatients] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const [searchErrorTxt, setSearchErrorTxt] = useState("");
  const debounce = useDebounce(searchTxt, 500);

  useEffect(() => {
    fetchData();
  }, [debounce]);

  const fetchData = async () => {
    // Trim searchTxt to remove leading/trailing whitespace and check if it's empty
    if (searchTxt.trim() === "") {
      setPatients([]); // Clear the patients array if searchTxt is empty or whitespace
      return; // Exit the function if searchTxt is empty or whitespace
    }
    const endpoint = `/api/patients?search=${searchTxt}`;
    try {
      const res = await client.get(endpoint);
      const data = await res.data;
      setPatients(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <UserSearchIcon className="absolute left-2.5 top-2.5 w-4 h-4 sm:h-5 sm:w-5 text-muted-foreground" />
      <Input
        type="search"
        placeholder="First name, Last name or Phone"
        className="w-full rounded-lg bg-background pl-8 md:w-96"
        value={searchTxt}
        onClick={() => setOpen(true)}
        onChange={(e) => {
          setSearchTxt(e.target.value);
        }}
        onBlur={() => {
          setTimeout(() => {
            setOpen(false);
            setSearchTxt("");
          }, 100);
        }}
      />

      <ul className="absolute z-10 w-full bg-background rounded-lg shadow-lg">
        {patients.length == 0 && open && (
          <li className="p-2 text-muted-foreground">Not Found</li>
        )}
        {patients &&
          patients.map((patient) => (
            <Link key={patient.id} to={`patient&patientId=${patient.id}`}>
              <li className="text-sm sm:text-sm md:text-base p-2 text-muted-foreground hover:bg-secondary">
                {patient.last_name} {patient.first_name} -{" "}
                {patient.phone_number}
              </li>
              <Separator />
            </Link>
          ))}
      </ul>
    </>
  );
}
