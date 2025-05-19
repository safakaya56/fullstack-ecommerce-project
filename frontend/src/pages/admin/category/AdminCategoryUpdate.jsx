import { useParams } from "react-router-dom"
import { Container } from "@mui/material"
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import {CLIENT_DOMAIN} from '../../../config';

function AdminCategoryUpdate() {


  const { id } = useParams();

  const [category, setCategory] = useState({});

  const handleGetCategory = async (id) => {
    const response = await fetch(`${CLIENT_DOMAIN}/categories/${id}`);

    if (response.ok) {
      const data = await response.json();
      setCategory(data);
    }
  }

  const handleGetInput = (e) => {
    const { name, value } = e.target;
    setCategory(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${CLIENT_DOMAIN}/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category)
      })

      if (response.ok) {
        await Swal.fire({ text: "Update is successful", icon: "success", showConfirmButton: false, timer: 1500, scrollbarPadding: false });
      }
      else {
        await Swal.fire({ text: "Opps! Problem", icon: "error", showConfirmButton: false, timer: 1500, scrollbarPadding: false });
      }

    } catch (error) {
      console.error(error);
    }

  }

  useEffect(() => {
    handleGetCategory(id);
  }, [id])



  return (
    <Container maxWidth="sm">
      {
        category &&

        <form className="mt-5" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" className="form-control" placeholder="Enter a title" value={category.title} name="title" onChange={handleGetInput} />
          </div>
          <div className="form-group mt-2">
            <label>İmage (URL)</label>
            <input type="text" className="form-control" placeholder="İmage's URL" value={category.img} name="img" onChange={handleGetInput} />
          </div>
          <button type="submit" className="btn btn-primary mt-3">Update</button>
        </form>
      }
    </Container>
  )
}

export default AdminCategoryUpdate