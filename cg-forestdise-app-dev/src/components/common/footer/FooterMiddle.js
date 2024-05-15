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
                        <Button className="pb-5" variant="h6">
                            About
                        </Button>
                    </div>

                    <div>
                        <Button className="pb-5" variant="h6">
                            Blog
                        </Button>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6">
                            Press
                        </Button>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6">
                            Jobs
                        </Button>
                    </div>

                    <div>
                        <Button className="pb-5" variant="h6">
                            Partner
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography className="pb-5" variant="h6">
                        Solution
                    </Typography>

                    <div>
                        <Button className="pb-5" variant="h6">
                            Marketing
                        </Button>
                    </div>

                    <div>
                        <Button className="pb-5" variant="h6">
                            Analytics
                        </Button>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6">
                            Commerce
                        </Button>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6">
                            Insights
                        </Button>
                    </div>

                    <div>
                        <Button className="pb-5" variant="h6">
                            Supports
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography className="pb-5" variant="h6">
                        Documentation
                    </Typography>

                    <div>
                        <Button className="pb-5" variant="h6">
                            Privacy
                        </Button>
                    </div>

                    <div>
                        <Button className="pb-5" variant="h6">
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
