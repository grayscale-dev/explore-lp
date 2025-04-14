import { Component, inject, ViewChild } from "@angular/core";
import { WaterDataService } from "src/app/core/services/water-data.service";
import { IonTitle, IonButtons, IonButton, IonIcon, IonHeader, IonPopover, IonCard, IonContent, IonToolbar, IonRefresher, IonRefresherContent, IonModal, IonAccordion, IonItem, IonLabel, IonAccordionGroup } from "@ionic/angular/standalone";
import { CommonModule } from "@angular/common";
import { addIcons } from "ionicons";
import { arrowDown, arrowUp, chevronCollapse, chevronDown, chevronUp, helpCircle, warning } from "ionicons/icons";

@Component({
    selector: 'water-page',
    imports: [IonAccordionGroup, IonLabel, IonItem, IonAccordion, IonModal, IonRefresherContent, IonRefresher, IonToolbar, IonContent, IonCard, IonPopover, IonHeader, IonIcon, IonButton, IonButtons, IonTitle, CommonModule],
    templateUrl: './water.component.html'
})

export class WaterPageComponent {
    waterDataService = inject(WaterDataService)

    monthlyTemperatures = [
        { month: "January", avg: "45°", min: "44°", max: "48°", category: "cold" },
        { month: "February", avg: "45°", min: "43°", max: "47°", category: "cold" },
        { month: "March", avg: "53°", min: "50°", max: "54°", category: "cold" },
        { month: "April", avg: "54°", min: "53°", max: "56°", category: "cold" },
        { month: "May", avg: "63°", min: "62°", max: "64°", category: "cold" },
        { month: "June", avg: "71°", min: "69°", max: "72°", category: "warm" },
        { month: "July", avg: "78°", min: "76°", max: "80°", category: "hot" },
        { month: "August", avg: "80°", min: "77°", max: "81°", category: "hot" },
        { month: "September", avg: "74°", min: "72°", max: "76°", category: "warm" },
        { month: "October", avg: "69°", min: "67°", max: "70°", category: "warm" },
        { month: "November", avg: "61°", min: "60°", max: "64°", category: "cold" },
        { month: "December", avg: "48°", min: "45°", max: "48°", category: "cold" }
    ];

    launchSites = [
        { site: "Stateline Auxiliary Ramp", minimumSafeElevation: 3502.00 },
        { site: "Bullfrog North Ramp", minimumSafeElevation: 3529.00 },
        { site: "Antelope Point Business Ramp", minimumSafeElevation: 3540.00 },
        { site: "Wahweap (Main Launch)", minimumSafeElevation: 3546.00 },
        { site: "Bullfrog Spur (Boats < 25')", minimumSafeElevation: 3549.00 },
        { site: "Halls Crossing (use at own risk)", minimumSafeElevation: 3556.00 },
        { site: "Stateline Launch", minimumSafeElevation: 3564.00 },
        { site: "Bullfrog (Main Launch)", minimumSafeElevation: 3578.00 },
        { site: "Castle Rock Cut-Off", minimumSafeElevation: 3583.00 },
        { site: "Antelope Point Public Ramp", minimumSafeElevation: 3588.00 },
        { site: "Dominguez Butte Cut-Off", minimumSafeElevation: 3602.00 },
        { site: "Gunsight to Padre Bay Cut-Off", minimumSafeElevation: 3613.00 },
        { site: "Hite", minimumSafeElevation: 3650.00 },
        { site: "Farley Canyon", minimumSafeElevation: 3653.00 },
        { site: "Copper Canyon", minimumSafeElevation: 3663.00 },
        { site: "Bullfrog to Halls Creek Cut-Off", minimumSafeElevation: 3670.00 },
        { site: "Piute Farms", minimumSafeElevation: 3682.00 }
      ];

    currentMonth = new Date().toLocaleDateString('en-US', { month: 'long' })
    currentWaterTemperature = this.monthlyTemperatures.filter(item => 
        item.month === this.currentMonth
    )[0]

    @ViewChild(IonModal) modal!: IonModal;

    closeCurrentTempModal() {
        this.modal.dismiss(null)
    }

    constructor() {
        addIcons({helpCircle, warning, chevronDown, chevronUp, chevronCollapse})
    }

    handleRefresh(event: any) {
        // this.waterDataService.data.reload()
        event.target.complete()
    }
}