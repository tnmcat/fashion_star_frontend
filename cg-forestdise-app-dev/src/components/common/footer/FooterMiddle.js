import React from "react";
import FooterMiddleList from "./FooterMiddleList";
import {middleList} from "../../../constants";
import {logo, vnFlag} from "../../../assets";
import {Button, Grid, Typography, Link} from "@mui/material";
function FooterMiddle() {
    return (
        <div>
            <Grid
                className="bg-black text-white text-center mt-10"
                container
                sx={{bgcolor: "black", color: "white", py: 3}}
            >
                <Grid item xs={12} sm={6} md={3}>
                    <Typography className="pb-5" variant="h6">
                        Company
                    </Typography>

                    <div>
                        <Button className="pb-5" variant="h6" gutterBottom>
                            About
                        </Button>
                    </div>

                    <div>
                        <Button className="pb-5" variant="h6" gutterBottom>
                            Blog
                        </Button>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6" gutterBottom>
                            Press
                        </Button>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6" gutterBottom>
                            Jobs
                        </Button>
                    </div>

                    <div>
                        <Button className="pb-5" variant="h6" gutterBottom>
                            Partner
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography className="pb-5" variant="h6">
                        Solution
                    </Typography>

                    <div>
                        <Button className="pb-5" variant="h6" gutterBottom>
                            Marketing
                        </Button>
                    </div>

                    <div>
                        <Button className="pb-5" variant="h6" gutterBottom>
                            Analytics
                        </Button>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6" gutterBottom>
                            Commerce
                        </Button>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6" gutterBottom>
                            Insights
                        </Button>
                    </div>

                    <div>
                        <Button className="pb-5" variant="h6" gutterBottom>
                            Supports
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography className="pb-5" variant="h6">
                        Documentation
                    </Typography>

                    <div>
                        <Button className="pb-5" variant="h6" gutterBottom>
                            Privacy
                        </Button>
                    </div>

                    <div>
                        <Button className="pb-5" variant="h6" gutterBottom>
                            Term
                        </Button>
                    </div>
                </Grid>
                <Grid className="pt-20" item xs={12}>
                    <Typography variant="body2" component="p" align="center">
                        &copy; 2024 My Company. All right reserved.
                    </Typography>
                    <Typography variant="body2" component="p" align="center">
                        Made with love.
                    </Typography>
                    <Typography variant="body2" component="p" align="center">
                        Ions made by
                    </Typography>
                    <Link href="google.com" color="inherit" underline="always">
                        Google
                    </Link>
                    <Link href="google.com" color="inherit" underline="always">
                        Google
                    </Link>
                </Grid>
            </Grid>
        </div>
    );
}

export default FooterMiddle;
