import React, { useState, useEffect } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CalendarPlus, Pen, ChevronLeft, ChevronDown } from "lucide-react";
import teethImage from "../../assets/teeth.png";
import { useParams } from "react-router-dom";
import api from "../../api";
import { ACCESS_TOKEN } from "/src/constants";
import { useToast } from "@/components/ui/use-toast";
import { jwtDecode } from "jwt-decode";
import { set } from "date-fns";

const Services = ({ patientId, selectedTeeth, fetchTreatments }) => {
  const [speciality, setSpeciality] = useState([]);
  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState([]);
  const [subSubServices, setSubSubServices] = useState([]);
  const [openItems, setOpenItems] = useState({}); // State to track open/closed state
  const [prices, setPrices] = useState({});
  const [pricePopover, setPricePopover] = useState(false);
  const token = jwtDecode(localStorage.getItem(ACCESS_TOKEN));
  const { toast } = useToast();

  useEffect(() => {
    const fetchSpeciality = async () => {
      try {
        const response1 = await api.get(`/api/specialities/`);
        const response2 = await api.get(`/api/dental-services/`);
        const response3 = await api.get(`/api/sub-category-services/`);
        const response4 = await api.get(`/api/sub-sub-category-services/`);
        setSpeciality(response1.data);
        setServices(response2.data);
        setSubServices(response3.data);
        setSubSubServices(response4.data);
        response2.data
          .filter((service) => !service.has_subcategories)
          .map((service) => {
            setPrices((prevPrices) => ({
              ...prevPrices,
              [`${service.id}-${service.name}`]: service.price,
            }));
          });

        response3.data
          .filter((service) => !service.has_subcategories)
          .map((service) => {
            setPrices((prevPrices) => ({
              ...prevPrices,
              [`${service.id}-${service.name}`]: service.price,
            }));
          });

        response4.data.map((service) => {
          setPrices((prevPrices) => ({
            ...prevPrices,
            [`${service.id}-${service.name}`]: service.price,
          }));
        });
      } catch (error) {
        console.error("Error fetching speciality:", error);
      }
    };

    fetchSpeciality();
  }, []);

  const handlePriceSubmit = async (e, service) => {
    e.preventDefault();
    var link = "";

    if (service.speciality) {
      link = `/api/dental-services/${service.id}/`;
    } else if (service.category)
      link = `/api/sub-category-services/${service.id}/`;
    else if (service.subcategory)
      link = `/api/sub-sub-category-services/${service.id}/`;

    console.log(`link: ${link}`);
    try {
      const response = await api.patch(link, {
        price: prices[`${service.id}-${service.name}`],
      });
      console.log("Price submitted");
      toast({
        variant: "success",
        title: "Success",
        description: "Successs: Price updated!",
      });
    } catch (e) {
      console.error("Error fetching treatments:", e);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error: " + JSON.stringify(e.response.data),
      });
    }
    //  finally {
    //   setPricePopover(false);
    // }
  };

  const handleToggle = (id) => {
    setOpenItems((prevOpenItems) => ({
      ...prevOpenItems,
      [id]: !prevOpenItems[id], // Toggle the open state
    }));
  };

  const createTreatment = async (service, options = {}) => {
    console.log("service name: " + service.name);
    var treatment_name = service.name;

    var treatment_price = prices[`${service.id}-${service.name}`];
    const { subService = null, subSubService = null } = options;

    if (subService) {
      treatment_name = treatment_name + " - " + subService.name;
      treatment_price = prices[`${subService.id}-${subService.name}`];
    }
    if (subSubService) {
      treatment_name = treatment_name + " - " + subSubService.name;
      treatment_price = prices[`${subSubService.id}-${subSubService.name}`];
    }
    const general_treatments = ["Consultation générale", "Détartrage"];
    const data = {
      patient: patientId,
      dentist: token.user_id,
      teeth: selectedTeeth,
      diagnostic: "",
      notes: "",
      price: treatment_price,
      treatment_name: treatment_name,
      status: "P",
    };
    console.log(service);
    console.log(data);
    if (
      (data.teeth.length === 0 && general_treatments.includes(service.name)) ||
      data.teeth.length > 0
    ) {
      try {
        const response = await api.post(`/api/treatments/`, data);
        console.log(response.data);
        fetchTreatments();
        toast({
          variant: "success",
          title: "Success",
          description: "Successs: Treatment added!",
        });
      } catch (error) {
        console.error("Error fetching treatments:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Error: " + JSON.stringify(error.response.data),
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Error: you must select at least a tooth first for this type of treatment!",
      });
    }
  };
  return (
    <>
      {speciality.map((sp) => (
        <Collapsible key={sp.id}>
          <CollapsibleTrigger
            onClick={() => handleToggle(sp.id)}
            className="w-full"
          >
            <div className="rounded-md border px-4 py-3 mb-1 font-medium text-sm">
              <div className="flex justify-between items-center">
                <span>{sp.name}</span>
                {openItems[sp.id] ? <ChevronDown /> : <ChevronLeft />}
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent
            className="CollapsibleContent"
            open={openItems[sp.id]}
          >
            {services
              .filter((service) => service.speciality === sp.id)
              .map((service) => (
                <Collapsible key={service.id}>
                  <CollapsibleTrigger
                    className="w-4/5"
                    onClick={() => handleToggle(service.id)}
                  >
                    <div className="rounded-md border px-4 py-3 font-medium text-sm bg-red-300">
                      <div className="flex justify-between items-center">
                        <span
                          onClick={() => {
                            console.log("clicked");
                            if (!service.has_subcategories) {
                              console.log("creating treatment...");
                              createTreatment(service);
                            }
                          }}
                        >
                          {service.name}
                        </span>
                        {service.has_subcategories ? (
                          openItems[service.id] ? (
                            <ChevronDown />
                          ) : (
                            <ChevronLeft />
                          )
                        ) : (
                          <Popover>
                            <PopoverTrigger>
                              <Pen size={16} />
                            </PopoverTrigger>
                            <PopoverContent>
                              <form
                                onSubmit={(e) => handlePriceSubmit(e, service)}
                                className="grid gap-2"
                              >
                                <div>
                                  <Label htmlFor="price">Price</Label>
                                  <Input
                                    type="number"
                                    placeholder={service.price}
                                    value={
                                      prices[`${service.id}-${service.name}`]
                                    }
                                    onChange={(e) => {
                                      setPrices((prevPrices) => ({
                                        ...prevPrices,
                                        [`${service.id}-${service.name}`]:
                                          e.target.value,
                                      }));
                                    }}
                                  />
                                </div>
                                <div>
                                  <Button type="submit" className="col-span-3">
                                    <Pen className="mr-2 h-4 w-4" /> Change
                                    Price
                                  </Button>
                                </div>
                              </form>
                            </PopoverContent>
                          </Popover>
                        )}
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent
                    className="ml-4 CollapsibleContent"
                    open={openItems[service.id]}
                  >
                    {subServices
                      .filter(
                        (subService) =>
                          service.has_subcategories &&
                          subService.category === service.id
                      )
                      .map((subService) => (
                        <Collapsible key={subService.id}>
                          <CollapsibleTrigger
                            className="w-3/5"
                            onClick={() => handleToggle(subService.id)}
                          >
                            <div className="rounded-md border px-4 py-3 font-medium text-sm bg-red-300">
                              <div className="flex justify-between items-center">
                                <span
                                  onClick={() => {
                                    if (!subService.has_subcategories) {
                                      console.log("creating treatment...");
                                      createTreatment(service, {
                                        subService: subService,
                                      });
                                    }
                                  }}
                                >
                                  {subService.name}
                                </span>
                                {subService.has_subcategories ? (
                                  openItems[subService.id] ? (
                                    <ChevronDown />
                                  ) : (
                                    <ChevronLeft />
                                  )
                                ) : (
                                  <Popover>
                                    <PopoverTrigger>
                                      <Pen size={16} />
                                    </PopoverTrigger>
                                    <PopoverContent>
                                      <form
                                        onSubmit={(e) =>
                                          handlePriceSubmit(e, subService)
                                        }
                                        className="grid gap-2"
                                      >
                                        <div>
                                          <Label htmlFor="price">Price</Label>
                                          <Input
                                            type="number"
                                            placeholder={subService.price}
                                            value={
                                              prices[
                                                `${subService.id}-${subService.name}`
                                              ]
                                            }
                                            onChange={(e) => {
                                              setPrices((prevPrices) => ({
                                                ...prevPrices,
                                                [`${subService.id}-${subService.name}`]:
                                                  e.target.value,
                                              }));
                                            }}
                                          />
                                        </div>
                                        <div>
                                          <Button
                                            type="submit"
                                            className="col-span-3"
                                          >
                                            <Pen className="mr-2 h-4 w-4" />{" "}
                                            Change Price
                                          </Button>
                                        </div>
                                      </form>
                                    </PopoverContent>
                                  </Popover>
                                )}
                              </div>
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent
                            className="CollapsibleContent"
                            open={openItems[subService.id]}
                          >
                            {subSubServices
                              .filter(
                                (subSubService) =>
                                  subService.has_subcategories &&
                                  subSubService.subcategory === subService.id
                              )
                              .map((subSubService) => (
                                <Collapsible key={subSubService.id}>
                                  <CollapsibleTrigger
                                    className="w-2/5"
                                    onClick={() =>
                                      handleToggle(subSubService.id)
                                    }
                                  >
                                    <div className="rounded-md border px-4 py-3 font-medium text-sm bg-red-300">
                                      <div className="flex justify-between items-center">
                                        <span
                                          onClick={() => {
                                           
                                              console.log(
                                                "creating treatment... subsub"
                                              );
                                              createTreatment(service, {
                                                subService: subService,
                                                subSubService: subSubService,
                                              });
                                            
                                          }}
                                        >
                                          {subSubService.name}
                                        </span>
                                
                                          <Popover>
                                            <PopoverTrigger>
                                              <Pen size={16} />
                                            </PopoverTrigger>
                                            <PopoverContent>
                                              <form
                                                onSubmit={(e) =>
                                                  handlePriceSubmit(
                                                    e,
                                                    subSubService
                                                  )
                                                }
                                                className="grid gap-2"
                                              >
                                                <div>
                                                  <Label htmlFor="price">
                                                    Price
                                                  </Label>
                                                  <Input
                                                    type="number"
                                                    placeholder={
                                                      subSubService.price
                                                    }
                                                    value={
                                                      prices[
                                                        `${subSubService.id}-${subSubService.name}`
                                                      ]
                                                    }
                                                    onChange={(e) => {
                                                      setPrices(
                                                        (prevPrices) => ({
                                                          ...prevPrices,
                                                          [`${subSubService.id}-${subSubService.name}`]:
                                                            e.target.value,
                                                        })
                                                      );
                                                    }}
                                                  />
                                                </div>
                                                <div>
                                                  <Button
                                                    type="submit"
                                                    className="col-span-3"
                                                  >
                                                    <Pen className="mr-2 h-4 w-4" />{" "}
                                                    Change Price
                                                  </Button>
                                                </div>
                                              </form>
                                            </PopoverContent>
                                          </Popover>
                                     
                                      </div>
                                    </div>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent
                                    className="CollapsibleContent"
                                    open={openItems[subSubService.id]}
                                  >
                                    {/* Content for subSubService */}
                                  </CollapsibleContent>
                                </Collapsible>
                              ))}
                          </CollapsibleContent>
                        </Collapsible>
                      ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </>
  );
};

export default Services;
