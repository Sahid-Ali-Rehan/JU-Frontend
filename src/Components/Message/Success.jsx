import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import Navbar from "../Navigations/Navbar";
import Footer from "../Footer/Footer";

const Success = () => {
  const navigate = useNavigate();
  const order = JSON.parse(localStorage.getItem("orderSuccess"));

  const [expectedDelivery, setExpectedDelivery] = useState(null);

  useEffect(() => {
    if (order) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 7);
      setExpectedDelivery(currentDate);

      generateInvoice(order, currentDate);
    } else {
      navigate("/"); // Redirect to home if no order data
    }
  }, []); // Run only once on component mount

  const generateInvoice = (order, deliveryDate) => {
    const doc = new jsPDF("portrait", "px", "a4");
  
    // Set Background Color
    doc.setFillColor("#F9FAE7");
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, "F");
  
    // Add Top-Left-Corner.png
    const topLeftImage = "Invoice/Top-Left-Corner.png"; // Ensure correct path
    doc.addImage(topLeftImage, "PNG", -30, -30, 160, 160);  // 2x size, moved higher
  
    // Add T-Logo.png at Top Right
    const topRightImage = "Invoice/T-Logo.png"; // Ensure correct path
    const pageWidth = doc.internal.pageSize.width;
    const logoWidth = 80; // Logo width in pixels
    const logoPadding = 20; // Padding from the edge
    const logoX = pageWidth - logoWidth - logoPadding; // Calculate x-coordinate
    doc.addImage(topRightImage, "PNG", logoX, 20, logoWidth, 80); // Adjust height as needed
  
    // Add Top-Center.png
    const topCenterImage = "Invoice/Top-Center.png"; // Ensure correct path
    doc.addImage(topCenterImage, "PNG", 100, -100, 350, 250);  // 3x size, expanded
  
    // Add Center.png in Center (300x300px)
    const centerImage = "Invoice/Center.png"; // Ensure correct path
    const pageHeight = doc.internal.pageSize.height;
    const centerX = (pageWidth - 300) / 2;
    const centerY = (pageHeight - 300) / 2;
    doc.addImage(centerImage, "PNG", centerX, centerY, 300, 300);
  
    // Header Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor("#8d5c51");
    doc.text(`Invoice No: ${Math.floor(100000 + Math.random() * 900000)}`, 20, 150);
    doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 20, 170);
    doc.text(`Delivery Date: ${deliveryDate.toDateString()}`, 20, 190);
  
    // Customer Details Section (Modified)
    doc.setFont("helvetica", "normal");  // Use a different font like Helvetica
    doc.setFontSize(10); // Smaller font size for the entire section
    doc.setTextColor("#8B4513"); // Brown color for labels (Phone, Email, Address)

    // Label: Invoice To
    doc.text("Invoice To:", 20, 220);

    // Name in Olive Green
    doc.setTextColor("#708238"); // Olive green color for the name
    doc.text(`${order.name}`, 100, 220);

    // Phone in Brown, Value in Olive Green (on the same line)
    doc.setTextColor("#8B4513"); // Brown for label
    doc.text("Phone:", 20, 240);
    doc.setTextColor("#708238"); // Olive green for value
    doc.text(`${order.phone}`, 100, 240);

    // Email in Brown, Value in Olive Green (on the same line)
    doc.setTextColor("#8B4513"); // Brown for label
    doc.text("Email:", 20, 260);
    doc.setTextColor("#708238"); // Olive green for value
    doc.text(`${order.email}`, 100, 260);

    // Address in Brown, Value in Olive Green (on the same line)
    doc.setTextColor("#8B4513"); // Brown for label
    doc.text("Address:", 20, 280);
    doc.setTextColor("#708238"); // Olive green for value
    doc.text(`${order.address}`, 100, 280);

    // Order Table Header
    let yOffset = 340;
    doc.setFont("helvetica", "bold");
    doc.setFillColor("#f4ebb4");
    doc.setDrawColor("#8d5c51");
    doc.rect(20, yOffset - 15, pageWidth - 40, 20, "F");
    doc.setTextColor("#7d835f");
    doc.text("No.", 30, yOffset);
    doc.text("Description", 80, yOffset);
    doc.text("Quantity", pageWidth - 170, yOffset, { align: "right" });
    doc.text("Amount", pageWidth - 50, yOffset, { align: "right" });

    // Table Content
    doc.setFont("helvetica", "normal");
    doc.setTextColor("#7b7c4d");
    order.items.forEach((item, index) => {
      yOffset += 20;
      doc.text(`${index + 1}`, 30, yOffset);
      doc.text(item.productName, 80, yOffset);
      doc.text(`${item.quantity}`, pageWidth - 170, yOffset, { align: "right" });
      doc.text(`Tk. ${item.quantity * item.price}`, pageWidth - 50, yOffset, { align: "right" });
    });

    // Total Section
    yOffset += 30;
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#a0926c");
    doc.text(`Delivery Charge: Tk. ${order.deliveryCharge}`, 20, yOffset);
    yOffset += 20;
    doc.text(`Total Amount: Tk. ${order.totalAmount}`, 20, yOffset);

    // Footer Section
    yOffset += 50;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor("#ceba98");
    doc.text(
      "Thank you for shopping with Ruhana's Fashion! Payment must be made immediately.",
      20,
      yOffset
    );

    // Bottom Border under Summary
    doc.setDrawColor("#8d5c51");
    doc.setLineWidth(2);
    doc.line(20, yOffset + 20, pageWidth - 20, yOffset + 20); // Line just under summary
  
    // Save PDF
    doc.save("invoice.pdf");
};

  
    
  
  
  
  

  if (!expectedDelivery) return <div>Loading...</div>;

  const formattedDelivery = expectedDelivery.toDateString();

  return (
    <div className="bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Order Successful!</h2>
        <p className="mb-6">Your invoice has been downloaded successfully.</p>
        <div className="border p-4 rounded mb-6">
          <h3 className="font-bold text-lg mb-4">Order Summary</h3>
          <p><strong>Name:</strong> {order.name}</p>
          <p><strong>Expected Delivery:</strong> {formattedDelivery}</p>
          <p><strong>Total:</strong> Tk. {order.totalAmount}</p>
        </div>
        <button
          className="px-6 py-3 bg-[#8d5c51] text-white rounded hover:bg-[#7d835f] transition w-full"
          onClick={() => {
            localStorage.removeItem("orderSuccess");
            navigate("/");
          }}
        >
          Back to Home
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Success;
